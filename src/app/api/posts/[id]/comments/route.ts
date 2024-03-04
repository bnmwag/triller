import { db } from "@/db";
import { commentsQueries } from "@/db/queries/comments.queries";
import { comments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { v4 } from "uuid";
import {
  TPostsIdCommentsValidator,
  postsIdCommentsValidator,
} from "./validator";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const postId = params.id;

  if (!postId) {
    return Response.json({
      status: 404,
      message: "Not Found",
    });
  }

  const result = await commentsQueries.getByPostId({
    postId,
    limit: 10,
    offset: cursor ? parseInt(cursor, 10) : 0,
  });

  return Response.json(result);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;

  const session = await auth();
  const body = await req.json();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { content } = postsIdCommentsValidator.POST.req.parse(body);

    await db.insert(comments).values({
      id: v4(),
      content,
      postId,
      userId: session.user.id,
    });
  } catch (error) {
    console.log(error);

    const response: TPostsIdCommentsValidator["POST"]["res"] = {
      status: 422,
      message: "Unprocessable Entity",
    };

    return new Response("Unprocessable Entity", response);
  }

  const response: TPostsIdCommentsValidator["POST"]["res"] = {
    status: 200,
    message: "OK",
  };

  return new Response("OK", response);
}
