import { postsQueries } from "@/db/queries/posts.queries";
import { auth } from "@/lib/auth";
import { TPostsIdValidator, postsIdValidator } from "./validator";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;

  if (!postId) {
    return new Response("Not Found", { status: 404 });
  }

  const result = await postsQueries.getById(postId);

  return Response.json(result);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;

  if (!postId) {
    return new Response("Not Found", { status: 404 });
  }

  await postsQueries.deleteById(postId);

  const response: TPostsIdValidator["PUT"]["res"] = {
    status: 200,
    message: "OK",
  };

  return new Response(JSON.stringify(response));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await auth();
  const body = await req.json();

  if (!postId) {
    return new Response("Not Found", { status: 404 });
  }

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { content } = postsIdValidator.PUT.req.parse(body);

    // Update post logic
  } catch (error) {
    console.log(error);

    const response: TPostsIdValidator["PUT"]["res"] = {
      status: 422,
      message: "Unprocessable Entity",
    };

    return new Response(JSON.stringify(response), {
      status: response.status,
    });
  }

  const response: TPostsIdValidator["PUT"]["res"] = {
    status: 200,
    message: "OK",
  };

  return new Response("OK", response);
}
