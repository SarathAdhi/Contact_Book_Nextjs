// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../utils/supabaseClient";

type Data = {
  message: string;
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    return res.status(404).json({
      error: "User not found",
      message: "Entered email is not registered",
    });
  }

  const user = {
    user_id: data.user_id,
    email: data.email,
  };

  return res.status(200).json({
    data: { user },
    error: "",
    message: "Login successful",
  });
}
