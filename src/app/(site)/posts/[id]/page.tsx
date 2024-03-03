import { PostDetail } from "@/components/post-detail";
import { PostFeed } from "@/components/post-feed";
import { PostInput } from "@/components/post-input";
import { db, eq } from "@/db";
import { commentsQueries } from "@/db/queries/comments.queries";
import { postsQueries } from "@/db/queries/posts.queries";
import { comments, posts, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { NextPage } from "next";
import { notFound } from "next/navigation";

interface IPostIdPageProps {
  params: { id: string };
}

const PostIdPage: NextPage<IPostIdPageProps> = async ({ params: { id } }) => {
  const session = await auth();

  const post = await postsQueries.getById(id);

  const comments = await commentsQueries.getByPostId({
    postId: id,
    limit: 10,
  });

  if (!post?.id) return notFound();

  return (
    <>
      <PostDetail post={post} />
      {!session || !session.user?.id ? null : (
        <PostInput user={session.user} postId={post.id} />
      )}
      <PostFeed
        posts={comments}
        endpoint={`/api/posts/${id}/comments`}
        isCommentFeed
      />
    </>
  );
};

export default PostIdPage;
