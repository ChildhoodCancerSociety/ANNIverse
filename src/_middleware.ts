// TODO: reintroduce this by renaming to middleware.ts once
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log("running middleware");
      console.log(req);
      return !!token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
