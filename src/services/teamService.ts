import prisma from "../prisma";

export const findTeamById = async (teamId: number) => {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  return team;
};