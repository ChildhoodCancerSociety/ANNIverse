import prisma from "../prisma";

export const getAllMeetings = async () => {
  const meetings = await prisma.meeting.findMany();
  return meetings;
};

export const createMeeting = async (name: string, description: string) => {
  const meeting = await prisma.meeting.create({ data: { name, description } });
  return meeting;
};

export const getMeetingById = async (id: string) => {
  const meeting = await prisma.meeting.findUnique({ where: { id } });
  return meeting;
};

export const updateMeetingById = async (id: string, name: string, description: string) => {
  const meeting = await prisma.meeting.update({ where: { id }, data: { name, description } });
  return meeting;
};

export const deleteMeetingById = async (id: string) => {
  await prisma.meeting.delete({ where: { id } });
};
