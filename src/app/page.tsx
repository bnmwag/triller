import { PostFeed } from "@/components/post-feed";
import { PostInput } from "@/components/post-input";
import { db, desc, eq } from "@/db";
import { posts, users } from "@/db/schema";
import { auth } from "@/lib/auth";

import type { NextPage } from "next";

const IndexPage: NextPage = async () => {
  const session = await auth();

  const result = await db
    .select({
      id: posts.id,
      content: posts.content,
      user: { id: users.id, name: users.name, image: users.image },
    })
    .from(posts)
    .fullJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt))
    .limit(10);

  return (
    <>
      {session && session.user && <PostInput user={session.user as any} />}
      <PostFeed posts={result} />
    </>
  );
};

export default IndexPage;
