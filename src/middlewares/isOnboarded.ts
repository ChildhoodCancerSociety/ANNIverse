import { PrismaClient } from "@prisma/client";

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

const prisma = PrismaClient;

// https://nextjs.org/docs/app/building-your-application/data-fetching/caching

const isOnboarded = cache(async (req: NextRequest, res: NextResponse) => {
  /* am i getting the user from the path, token/cookie, or saving from discord Auth0?  should we be looking for the user using the user.handle if we are getting a unique username from discord?  (I templated this off of Lilys users.id route) */
  const paths = req.nextUrl.pathname.split("/");
  const userId = paths[paths.length - 1];
  try {
    const onboarded = await prisma.User.findFirst({
      where: {
        id: userId,
      },
      select: {
        discord_id: true,
      },
    });
    if (!onboarded.discord_id) {
      // what route should we redirect to?
      redirect("/onboarding");
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.error();
  }
});
export default isOnboarded;
