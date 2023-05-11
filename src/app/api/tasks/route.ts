import { Response, Request, Router } from 'express'
import prisma from '@/prisma'
import { Prisma, PrismaClient,} from '@prisma/client'
import rbac from "@/middlewares/rbac";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany();
    res.json({ tasks })
}

let newTask: Prisma.TaskCreateInput;

export const createTask = async (req: Request, res: Response) => {

    const createTask = await prisma.task.create({ data: newTask });
    res.json({ createTask })
}

export const updateTaskById = async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const { title, description } = req.body;
    const updateTask = await prisma.task.update({
        where: { id: teamId },
        data: { title, description },
    })
    res.json({ updateTask })
}

export const getTasksById = async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const getTasks = await prisma.team.findUnique({
        where: { id: teamId },
    })
    res.json({ getTasks })
}

export const deleteTasksById = async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const deleteTask = await prisma.task.delete({
        where: { id: teamId }
    })
    res.json({ deleteTask })
}

const router = Router()

router.get("/", getTasks)
router.post("/", rbac("Volunteer"), createTask)
router.get("/:taskId", getTasksById)
router.put("/:taskId", rbac("Volunteer"), updateTaskById)
router.delete("/:taskId", rbac("Volunteer"), deleteTasksById)

// test test test