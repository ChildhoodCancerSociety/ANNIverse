import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


const getAllMeetings = async (req: Request, res: Response) => {
  const meetings = await prisma.meeting.findMany({
    include: { users: true, teams: true },
  });
  NextResponse.json({ meetings });
};

const createMeeting = async (req: Request, res: Response) => {
  
  const data = await req.json();
  const {title, description, date, time} = data;
  
  if (title === null) {
    return NextResponse.json({ error: "Title is required" });
  }

  if (description === null) {
    return NextResponse.json({ error: "Description is required" });
  }

  if (date === null) {
    return NextResponse.json({ error: "Date is required" });
  }

  if (time === null) {
    return NextResponse.json({ error: "Time is required" });
  }
  
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

const handler = async (req: Request, res: Response) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getAllMeetings(req, res);
      break;
    case 'POST':
      await createMeeting(req, res);
      break;
    default:
      return NextResponse.error();
  }
};

export default handler;
