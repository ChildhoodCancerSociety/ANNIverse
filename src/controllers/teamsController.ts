import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllTeams = async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: { users: true, meetings: true, tasks: true }
  });
  res.json({ teams });
};

export const createTeam = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const team = await prisma.team.create({ data: { name, description } });
  res.json({ team });
};

export const getTeamById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const team = await prisma.team.findUnique({ 
    where: { id: teamId },
    include: { users: true, meetings: true, tasks: true }
  });
  res.json({ team });
};

export const updateTeamById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { name, description } = req.body;
  const team = await prisma.team.update({ 
    where: { id: teamId }, 
    data: { name, description },
    include: { users: true, meetings: true, tasks: true }
  });
  res.json({ team });
};

export const deleteTeamById = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  await prisma.team.delete({ where: { id: teamId } });
  res.sendStatus(204);
};

//I added the include option to the findMany, findUnique, and update methods to fetch related data such as users, meetings, and tasks along with the team data. Additionally, I modified the create and update methods to accept the description field as well.
