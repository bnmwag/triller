import { PostInput } from "@/components/post-input";
import { auth } from "@/lib/auth";

import type { NextPage } from "next";

const IndexPage: NextPage = async () => {
  const session = await auth();

  return (
    <>{session && session.user && <PostInput user={session.user as any} />}</>
  );
};

export default IndexPage;
