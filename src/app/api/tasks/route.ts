import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { Prisma, PrismaClient,} from '@prisma/client'
import rbac from "@/middlewares/rbac";

export async function getTasks( req: Request, res: Response ) {
    const tasks = await prisma.task.findMany()
    return NextResponse.json({ tasks })
}
//const prisma = new PrismaClient()
let newTask: Prisma.TaskCreateInput

export async function createTask( req: Request , res: Response ) {
    const createTask = await prisma.task.create({ data: newTask });
    return NextResponse.json({ createTask })
}

export async function updateTaskById( req: Request, res: Response ) {
    const { teamId } = req.query
    const { title, description } = req.body
    const updateTask = await prisma.task.update({
        where: { id: String(teamId) },
        data: { title, description },
    })
    return NextResponse.json({ updateTask })
}

export const getTasksById = async (req: Request, res: Response) => {
    const { teamId } = req.query
    const getTasks = await prisma.team.findUnique({
        where: { id: String(teamId) },
    })
    return NextResponse.json({ getTasks })
}

export const deleteTasksById = async (req: Request, res: Response) => {
    const { teamId } = req.query
    const deleteTask = await prisma.task.delete({
        where: { id: String(teamId) }
    })
    return NextResponse.json({ deleteTask })
}





// test test test