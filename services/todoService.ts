import {PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function show (id?:any) {
    if(id != undefined){
        const todo = await prisma.todos.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return todo
    }
    
    const todo = await prisma.todos.findMany();
    return todo
}

export async function store (todo:any) {
    delete todo.id;

    const create = await prisma.todos.create({data: todo});
    return create
}



export async function updateStatus (id:any,) {
    try{
        const data = await show(id);
        const create = await prisma.todos.update({
            where: {
                id: data.id
            },
            data: {
                status: data.status == 'done' ? 'created' : 'done'
            }
        });
        return create
    } catch (err) {
        throw new Error(err)
    }

}
export async function update (id:any, formData:any) {
    try{
        const data = await show(id);
        const create = await prisma.todos.update({
            where: {
                id: data.id
            },
            data: formData
        });
        return create
    } catch (err) {
        throw new Error(err)
    }

}
export async function destroy (id:any) {
    try{
        const data = await show(id);
        const create = await prisma.todos.delete({
            where: {
                id: data.id
            },
        })
        return data
    } catch (err) {
        throw new Error(err)
    }

}


