import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


const getMeetingById = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  const meeting = await prisma.meeting.findUnique({
    where: { id: String(id) },
    include: { users: true, teams: true },
  });
  NextResponse.json({ meeting });
};

const updateMeetingById = async (req: NextRequest, res: NextResponse) => {
  
  const data = await req.json();
  const {id, title, description, date, time} = data;
  
  
  if (title !== null) {
    data.title = title;
  }
  if (description !== null) {
    data.description = description;
  }
  if (date !== null) {
    data.date = date;
  }
  if (time !== null) {
    data.time = time;
  }

  const meeting = await prisma.meeting.update({
    where: { id: String(id) },
    data:{
      title,
      description,
      date,
      time
    },
    include: { users: true, teams: true },
  });

  NextResponse.json({ meeting });
};

const deleteMeetingById = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  await prisma.meeting.delete({ where: { id: String(id) } });
  NextResponse.json({ message: "Meeting Deleted!" });
};

const handler = async (req: NextRequest, res: NextResponse) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getMeetingById(req, res);
      break;
    case 'PUT':
      await updateMeetingById(req, res);
      break;
    case 'DELETE':
      await deleteMeetingById(req, res);
      break;
    default:
      return NextResponse.error();
  }
};

export default handler;
