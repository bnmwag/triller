import { useSession } from "next-auth/react";

export const useSessionUser = () => {
  const session = useSession();

  if (session.status === "loading") {
    return null;
  } else if (session.status === "unauthenticated") {
    return null;
  }

  return session.data?.user;
};
