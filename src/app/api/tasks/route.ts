import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  const tasks = await prisma.task.findMany({
    include: { assigned_users: true, assigned_team: true },
  });
  return NextResponse.json({ tasks });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const {
    title,
    description,
    projectDueDate,
    deadline,
    approved,
    status,
    assigned_users,
  } = data;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectDueDate,
      deadline,
      approved,
      status,
// Create UserTask instances for each assigned user
      assignedUsers: {
        create: assigned_users.map((user:any) => ({
          userId: user.userId,
          task_requirements: user.task_requirements,
        })),
      },
    },
    include: { assigned_users: true, assigned_team: true },
  });

  return NextResponse.json({ task });
};
