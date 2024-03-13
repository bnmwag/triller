import { PostFeed } from "@/components/post-feed";
import { ProfileHeader } from "@/components/profile-header";
import { postsQueries } from "@/db/queries/posts.queries";
import { userQueries } from "@/db/queries/users.queries";
import { auth } from "@/lib/auth";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

const MePage: NextPage = async () => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return redirect("/login");
  }

  const userId = session.user.id;

  const user = await userQueries.getById(userId);
  const posts = await postsQueries.getAllByUserId(userId);

  return (
    <>
      <ProfileHeader user={user} />
      <PostFeed posts={posts} />
    </>
  );
};

export default MePage;
