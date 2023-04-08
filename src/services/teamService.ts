import prisma from "../prisma";

export const getAllTeams = async () => {
  
  const teams = await prisma.team.findMany();
  
  return teams;
};

export const createTeam = async (name:string, description:string) => {
  
  const team = await prisma.team.create({ 
    data: { name, description } 
  });
  
  return team;
};


export const getTeamById = async (id: string) => {
  
  const team = await prisma.team.findUnique({ where: { id } });
  
  return team;
};

export const updateTeamById = async (id:string, name:string,    description:string) =>{

  const team = await prisma.meeting.update({ 
    where: { id }, 
    data: { name, description }, 
    include: { users: true, meetings: true, tasks: true } 
   });

  return team;
}

export const deleteTeamById = async (id: string) => {

  await prisma.meeting.delete({ where: { id } });

};
