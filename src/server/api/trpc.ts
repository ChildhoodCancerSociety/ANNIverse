import { getServerAuthSession } from "@/server/auth";
import { USER_ROLES, prisma } from "@/server/db";
import type { Role } from "@/server/db";
import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import type { Session } from "next-auth";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
  session: Session | null;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  // TODO: discord client stuff will eventually live here so we can pass it into any procedure that requires calling discord server code. figure out the cleanest way to attach this here in the same way we also attach the prisma client
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
export const mergeTRPCRouters = t.mergeRouters;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

type RemoveNull<T> = {
  [P in keyof T]: Exclude<T[P], null>;
};
type SessionUser = RemoveNull<Session["user"]>;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No user session found.",
    });
  }

  if (ctx.session.user) {
    for (const [key, value] of Object.entries(ctx.session.user)) {
      if (value === null)
        ctx.session.user[key as "email" | "name" | "image"] = undefined;
    }
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user as SessionUser },
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

/**
 * Protected (authenticated) procedure that also takes into account user role in call
 * @param role user role enum member as defined in Prisma schema
 * @see https://github.com/ChildhoodCancerSociety/ANNIverse/blob/50e6bf3848e9fb1f5200a409dd99a14b4037d626/prisma/schema.prisma#L13
 */
export const roleBasedProcedure = (role: Role) =>
  t.procedure.use(enforceUserIsAuthed).use(
    t.middleware(async ({ ctx, next }) => {
      // since `enforceUserIsAuthed` is always called before this is used, we can skip authing steps and go directly to db

      // SHOULDFIX: this currently runs NO joins. should we do it here or define additional logic for joins in this rbac function definition?
      const user = await ctx.prisma.user.findUnique({
        where: { email: ctx.session?.user.email ?? undefined },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User is deleted or DNE",
        });
      }

      if (!user.role) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User has no role.",
        });
      }

      if (USER_ROLES.indexOf(user.role) < USER_ROLES.indexOf(role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User does not meet role criteria.",
        });
      }

      return next({
        ctx: {
          ...ctx,
          dbUser: user,
        },
      });
    })
  );
