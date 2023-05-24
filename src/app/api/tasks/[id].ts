import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const task = await prisma.task.findUnique({
    where: { id: String(id) },
    include: { assigned_users: true, assigned_team: true },
  });
  return NextResponse.json({ task });
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  const {
    id,
    title,
    description,
    projectDueDate,
    deadline,
    approved,
    status,
    assigned_users,
  } = data;
// Firstly, update the task itself
  const task = await prisma.task.update({
    where: { id: String(id) },
    data: {
      title,
      description,
      projectDueDate,
      deadline,
      approved,
      status,
    },
  });
// Secondly, update the assigned users
// For simplicity, let's delete all existing UserTask instances and create new ones
  await prisma.userTask.deleteMany({ where: { taskId: String(id) } });
  await prisma.userTask.createMany({
    data: assigned_users.map((user:any) => ({
      userId: user.userId,
      taskId: String(id),
      task_requirements: user.task_requirements,
    })),
  });
// Finally, fetch the updated task including the newly assigned users
  const updatedTask = await prisma.task.findUnique({
    where: { id: String(id) },
    include: { assigned_users: true, assigned_team: true },
  });

  return NextResponse.json({ task: updatedTask });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await prisma.task.delete({ where: { id: String(id) } });
  return NextResponse.json({ message: "Task Deleted!" });
};
