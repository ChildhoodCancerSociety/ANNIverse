import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  const meeting = await prisma.meeting.findUnique({
    where: { id: String(id) },
    include: { users: true, teams: true },
  });
  NextResponse.json({ meeting });
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  
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

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  await prisma.meeting.delete({ where: { id: String(id) } });
  NextResponse.json({ message: "Meeting Deleted!" });
};


