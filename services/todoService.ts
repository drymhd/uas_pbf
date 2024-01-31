import {PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function show (id:number) {
    const todo = await prisma.todos.findUnique({
        where: {
            id: id
        }
    })

    if(todo == null){
        throw new Error('Todo not found')
    }
    return todo
}


