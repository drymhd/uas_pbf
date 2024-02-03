// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { show, updateStatus, store } from "../../../services/todoService";
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

    if(body.type != undefined){
      
      if(body.type == "store"){
        try{
          const todo = await store(body.form);
          res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
          res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
        } catch (err) {
          res.status(404).json({ messsage: (err as Error).message });
        }
      } 

      if(body.type == "update_status"){
        try{
          const todo = await updateStatus(body.id);
          res.status(200).json({ messsage: "Sukes Mengambil data", data: todo });
        } catch (err) {
          res.status(404).json({ messsage: (err as Error).message });
        }
      }
    
    }
    
  }
}
