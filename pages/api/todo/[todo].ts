// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { show, updateStatus, store, update, destroy } from "../../../services/todoService";
import type Todo from "../../../model/todo";

type Data = {
  messsage: string;
  data?: object | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.todo

  if (req.method === "GET") {

    try{
      const todo = await show(id);
      res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
    } catch (err) {
      res.status(404).json({ messsage: (err as Error).message });
    }
  }
  
  if (req.method === "POST") {
    const body = JSON.parse(req.body)
    try{
      
      const todo = await update(id,body.form);
      res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
    } catch (err) {
      res.status(404).json({ messsage: (err as Error).message });
    }
  }

  if (req.method === "DELETE") {
    try{
      
      const todo = await destroy(id);
      res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
    } catch (err) {
      res.status(404).json({ messsage: (err as Error).message });
    }
  }
}
