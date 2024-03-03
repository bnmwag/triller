import { db, desc, eq } from "..";
import { comments, users } from "../schema";

interface ICommentsQueries {
  getByPostId: ({
    postId,
    limit,
    offset,
  }: {
    postId: string;
    limit: number;
    offset?: number;
  }) => Promise<any>;
}

export const commentsQueries: ICommentsQueries = {
  getByPostId: async ({ postId, limit, offset = 0 }) => {
    const res = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        user: { id: comments.userId, name: users.name, image: users.image },
      })
      .from(comments)
      .where(eq(comments.postId, postId))
      .fullJoin(users, eq(comments.userId, users.id))
      .orderBy(desc(comments.createdAt))
      .offset(offset)
      .limit(limit);

    return res;
  },
};
