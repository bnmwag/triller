import { db, eq, and } from "@/db";
import { likes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { v4 } from "uuid";
import { TPostsIdLikesValidator } from "./validator";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const likesCount = await db
    .select({ id: likes.id })
    .from(likes)
    .where(eq(likes.postId, postId));

  const hasLiked = await db
    .select({ id: likes.id })
    .from(likes)
    .where(and(eq(likes.postId, postId), eq(likes.userId, session.user.id)));

  const response: TPostsIdLikesValidator["GET"]["res"] = {
    status: 200,
    message: "OK",
    data: {
      count: likesCount.length,
      hasLiked: hasLiked.length > 0,
    },
  };

  return new Response(JSON.stringify(response), { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const hasLiked = await db
      .select({ id: likes.id })
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, session.user.id)));

    if (hasLiked.length) {
      await db
        .delete(likes)
        .where(
          and(eq(likes.postId, postId), eq(likes.userId, session.user.id)),
        );
    } else {
      await db
        .insert(likes)
        .values({ id: v4(), postId: postId, userId: session.user.id });
    }
  } catch (error) {
    console.log(error);

    const response: TPostsIdLikesValidator["POST"]["res"] = {
      status: 422,
      message: "Unprocessable Entity",
    };

    return new Response(JSON.stringify(response), { status: 422 });
  }

  const response: TPostsIdLikesValidator["POST"]["res"] = {
    status: 200,
    message: "OK",
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
