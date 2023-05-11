
import type { Request, Response, NextFunction } from "next/server";

import prisma, { Role } from "@/prisma";

export const userRoles: Role[] = ["Admin", "PM", "SoftwareDev", "Volunteer"];

export const userCanOperate = (
  checkedRole: Role,
  incomingRole: Role
): boolean => userRoles.indexOf(incomingRole) >= userRoles.indexOf(checkedRole);

export default (role: Role) => async (req: Request | any, res: Response, next: NextFunction) => {
  if(req.jwt) {
    const user = await prisma.user.findUnique({ where: { id: req.jwt.userId }, select: { role: true } });
    if(user?.role) {
      if(userCanOperate(role, user.role)) {

        req.role = user.role;
        next();
      }
    }
    res.sendStatus(403);
  }
  res.sendStatus(401);
};