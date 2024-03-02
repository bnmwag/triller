import { PostFeed } from "@/components/post-feed";
import { PostInput } from "@/components/post-input";
import { buttonVariants } from "@/components/ui/button";
import { db, desc, eq } from "@/db";
import { posts, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

import type { NextPage } from "next";
import Link from "next/link";

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
      {session && session.user ? (
        <PostInput user={session.user as any} />
      ) : (
        <div className="flex items-center justify-between border-b p-4">
          <p className="text-balance text-muted">
            You must be logged in to post.
          </p>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "px-8")}
            href="/api/auth/signin"
          >
            Sign In
          </Link>
        </div>
      )}
      <PostFeed posts={result} />
    </>
  );
};

export default IndexPage;
