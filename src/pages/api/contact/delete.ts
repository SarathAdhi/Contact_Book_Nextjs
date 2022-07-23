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
  const { number, user_id } = req.body;

  const { data } = await supabaseClient
    .from("contacts")
    .delete()
    .match({ number });

  const { data: contacts } = await supabaseClient
    .from("contacts")
    .select("*")
    .eq("user_id", user_id);

  return res.status(200).json({
    data: contacts,
    message: "Contact deleted successfully",
  });
}
