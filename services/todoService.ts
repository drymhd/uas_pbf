import {PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function show () {
    const todo = await prisma.todos.findMany();
    return todo
}


