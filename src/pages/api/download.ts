// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../utils/supabaseClient";
import vCardsJS from "vcards-js";

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

  let vCard: any = vCardsJS();

  const name = data?.map(({ name }) => name);
  const number = data?.map(({ number }) => number);

  vCard.firstName = name;
  vCard.cellPhone = number;

  const file = vCard.saveToFile(`james.vcf`);
  const { data: _data, error } = await supabaseClient.storage
    .from("vcf-file")
    .upload(`public/${id}.vcf`, file, { cacheControl: "3600", upsert: true });

  return res.status(200).json({
    data: _data,
    error: "",
    message: "File created. Downloading...",
  });
}
