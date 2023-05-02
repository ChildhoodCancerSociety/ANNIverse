import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma'
import { Prisma, PrismaClient,} from '@prisma/client'
import rbac from "@/middlewares/rbac";

export const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
    const tasks = await prisma.task.findMany()
    res.json({ tasks })
}

let newTask: Prisma.TaskCreateInput;

export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {

    const createTask = await prisma.task.create({ data: newTask });
    res.json({ createTask })
}

export const updateTaskById = async (req: NextApiRequest, res: NextApiResponse )=> {
    const { teamId } = req.query
    const { title, description } = req.body
    const updateTask = await prisma.task.update({
        where: { id: String(teamId) },
        data: { title, description },
    })
    res.json({ updateTask })
}

export const getTasksById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { teamId } = req.query
    const getTasks = await prisma.team.findUnique({
        where: { id: String(teamId) },
    })
    res.json({ getTasks })
}

export const deleteTasksById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { teamId } = req.query;
    const deleteTask = await prisma.task.delete({
        where: { id: String(teamId) }
    })
    res.json({ deleteTask })
}





// test test test