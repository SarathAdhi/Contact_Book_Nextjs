// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabaseClient";

type Data = {
  message: string;
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, name, number } = req.body;

  const { data: isNumberExist } = await supabaseClient
    .from("contacts")
    .select("*")
    .eq("number", number)
    .match({ user_id: id })
    .single();

  if (isNumberExist)
    return res.status(409).json({
      error: "Mobile number exist",
      message: "Entered mobile number already exist",
    });

  const user = {
    user_id: id,
    name,
    number,
    action: number,
  };

  const { data } = await supabaseClient.from("contacts").upsert(user).single();

  if (data) {
    const { data } = await supabaseClient
      .from("contacts")
      .select("*")
      .eq("user_id", id);
    return res.status(200).json({
      data,
      message: "Contact added successfully",
    });
  }

  return res.status(200).json({
    error: "ERROR",
    message: "Something went wrong",
  });
}
