import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import prisma, { Role } from "@/prisma";

export const userRoles: Role[] = ["Admin", "PM", "SoftwareDev", "Volunteer"];

export const userCanOperate = (
  checkedRole: Role,
  incomingRole: Role
): boolean => userRoles.indexOf(incomingRole) >= userRoles.indexOf(checkedRole);

export default (role: Role) => async (req: NextRequest, res: Response) => {
  if (req.jwt) {
    const user = await prisma.user.findUnique({
      where: { id: req.jwt.userId },
      select: { role: true },
    });
    if (user?.role) {
      if (userCanOperate(role, user.role)) {
        req.role = user.role;
        return NextResponse.next();
      }
    }
    return NextResponse.error();
  }
  return NextResponse.error();
};
