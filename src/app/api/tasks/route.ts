import { Prisma, PrismaClient } from "@prisma/client";

import { Request, Response, Router } from "express";

import prisma from "@/prisma";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json({ tasks });
};

let newTask: Prisma.TaskCreateInput;

export const createTask = async (req: Request, res: Response) => {
  const createTask = await prisma.task.create({ data: newTask });
  res.json({ createTask });
};

export const updateTaskById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { title, description } = req.body;
  const updateTask = await prisma.task.update({
    where: { id: teamId },
    data: { title, description },
  });
  res.json({ updateTask });
};

export const getTasksById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const getTasks = await prisma.team.findUnique({
    where: { id: teamId },
  });
  res.json({ getTasks });
};

export const deleteTasksById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const deleteTask = await prisma.task.delete({
    where: { id: teamId },
  });
  res.json({ deleteTask });
};

// test test test
