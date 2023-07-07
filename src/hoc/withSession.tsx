import type { User } from "@prisma/client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

type OnRedirect = (router: AppRouterInstance, session: Session | null) => void;
const onRedirectDefault: OnRedirect = (router, session) => {
  if (session) {
    const { user } = session;
    const { email = "", onBoardingDone } = (user as User) ?? {};

    if (email === user?.email) {
      if (onBoardingDone) {
        router.push("/");
        // Stop further execution
      } else {
        router.push("/auth/new-user");
        // Stop further execution
      }
    } else {
      router.push("/auth/verify-request");
      // Stop further execution
    }
  }
};

const withSession = <T extends JSX.IntrinsicAttributes = {}>(
  Page: React.FC<T>,
  onRedirect: OnRedirect = onRedirectDefault
): React.FC<T> => {
  const PageWithSession: React.FC<T> = (props: T) => {
    const router = useRouter();
    const { data: session } = useSession({
      required: true,
      onUnauthenticated: () => {
        onRedirect(router, session);
      },
    });

    return <Page {...props} />;
  };

  return PageWithSession;
};

export default withSession;