import { postsQueries } from "@/db/queries/posts.queries";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = params.id;

  if (!postId) {
    return new Response("Not Found", { status: 404 });
  }

  const result = await postsQueries.getById(postId);

  return new Response(JSON.stringify(result));
}
