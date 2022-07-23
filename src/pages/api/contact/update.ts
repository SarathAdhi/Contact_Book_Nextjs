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
  const { id, name, mobile } = req.body;

  const { data } = await supabaseClient
    .from("contacts")
    .update({ name, mobile })
    .match({ id });

  return res.status(200).json({
    data,
    message: "Contact saved successfully",
  });
}
