import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllMeetings = async (req: Request, res: Response) => {
  const meetings = await prisma.meeting.findMany({
    include: { users: true, teams: true }
  });
  res.json({ meetings });
};

export const createMeeting = async (req: Request, res: Response) => {
  const { title, description, date, time } = req.body;
  const meeting = await prisma.meeting.create({ 
    data: { title, description, date, time } 
  });
  res.json({ meeting });
};

export const getMeetingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meeting = await prisma.meeting.findUnique({ 
    where: { id }, 
    include: { users: true, teams: true }
  });
  res.json({ meeting });
};

export const updateMeetingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date, time } = req.body;
  const meeting = await prisma.meeting.update({ 
    where: { id },
    data: { title, description, date, time },
    include: { users: true, teams: true }
  });
  res.json({ meeting });
};

export const deleteMeetingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.meeting.delete({ where: { id } });
  res.sendStatus(204);
};
