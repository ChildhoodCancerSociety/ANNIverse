import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


export const GET = async (req: NextRequest, res: NextResponse) => {
  const meetings = await prisma.meeting.findMany({
    include: { users: true, teams: true },
  });
  NextResponse.json({ meetings });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const {title, description, date, time} = data;
  
  
  const meeting = await prisma.meeting.create({
    data: {
      title,
      description,
      date,
      time
    },
  });
  
  NextResponse.json({ meeting });
};


