import { v4 } from "uuid";
import { auth } from "@/lib/auth";
import { TPostsValidator, postsValidator } from "./validator";
import { db, desc, eq } from "@/db";
import { posts, users } from "@/db/schema";
import { postsQueries } from "@/db/queries/posts.queries";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");

  const result = await postsQueries.getAll({
    limit: 10,
    offset: cursor ? parseInt(cursor, 10) : 0,
  });

  return new Response(JSON.stringify(result));
}

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { content } = postsValidator.POST.req.parse(body);

    await db.insert(posts).values({
      id: v4(),
      content,
      userId: session.user.id,
    });
  } catch (error) {
    console.log(error);

    const response: TPostsValidator["POST"]["res"] = {
      status: 422,
      message: "Unprocessable Entity",
    };

    return new Response("Unprocessable Entity", response);
  }

  const response: TPostsValidator["POST"]["res"] = {
    status: 200,
    message: "OK",
  };

  return new Response("OK", response);
}
