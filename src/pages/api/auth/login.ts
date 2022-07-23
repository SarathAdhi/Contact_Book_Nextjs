// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabaseClient";
var bcrypt = require("bcryptjs");

type Data = {
  message: string;
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  if (req.headers.authorization !== process.env.API_ACCESS_TOKEN) {
    console.log("not allowed");
    return res.status(404).json({
      error: "Your are not authorized. Invalid API access token.",
      message: "",
    });
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return res.status(404).json({
      error: "User not found",
      message: "Entered email is not registered",
    });
  }

  const isCorrectPassword = await bcrypt.compareSync(password, data.password);

  if (isCorrectPassword) {
    return res.status(200).json({
      data: { id: data.user_id },
      error: "",
      message: "Login successful",
    });
  }
  return res.status(401).json({
    error: "Invalid Credentials ",
    message: "Entered password is wrong",
  });
}
