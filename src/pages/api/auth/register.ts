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
  const { name, email, password } = req.body;

  const { data: isUserExist } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (isUserExist)
    return res.status(409).json({
      error: "User already exist",
      message: "Entered email already exist",
    });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = {
    email,
    password: hash,
    name,
  };
  const { data } = await supabaseClient.from("users").upsert(user).single();

  if (data) {
    const id = data.user_id;
    return res
      .status(200)
      .json({ data: { id }, message: "Account created successfully" });
  }

  return res.status(200).json({
    error: "ERROR",
    message: "Something went wrong",
  });
}
