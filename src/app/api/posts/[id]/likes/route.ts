import { likeQueries } from "@/db/queries/likes.queries";
import { auth } from "@/lib/auth";
import { TPostsIdLikesValidator } from "./validator";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      status: 401,
      message: "Unauthorized",
    } as TPostsIdLikesValidator["GET"]["res"]);
  }

  const count = await likeQueries.getCountByPostId(postId);

  const hasLiked = await likeQueries.hasUserLiked(postId, session.user.id);

  return Response.json({
    status: 200,
    message: "OK",
    data: { count, hasLiked },
  } as TPostsIdLikesValidator["GET"]["res"]);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      status: 401,
      message: "Unauthorized",
    } as TPostsIdLikesValidator["POST"]["res"]);
  }

  try {
    const hasLiked = await likeQueries.hasUserLiked(postId, session.user.id);

    if (hasLiked) {
      await likeQueries.delete(postId, session.user.id);
    } else {
      await likeQueries.create(postId, session.user.id);
    }
  } catch (error) {
    console.log(error);

    return Response.json({
      status: 422,
      message: "Unprocessable Entity",
    } as TPostsIdLikesValidator["POST"]["res"]);
  }

  return Response.json({
    status: 200,
    message: "OK",
  } as TPostsIdLikesValidator["POST"]["res"]);
}
