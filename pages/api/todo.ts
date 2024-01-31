// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { show } from "../../services/todoService";
import type Todo from "../../model/todo";

type Data = {
  messsage: string;
  data?: object | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try{
      const todo = await show(1);
      res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
    } catch (err) {
      res.status(404).json({ messsage: (err as Error).message });
    }
  }

  if (req.method === "POST") {
    res.status(200).json({ messsage: "John Doe" });
  }
}
