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
  const { id } = req.body;

  const { data } = await supabaseClient
    .from("contacts")
    .select("*")
    .eq("user_id", id);

  return res.status(200).json({
    data,
    message: "Contact saved successfully",
  });
}
