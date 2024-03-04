import { db, desc, eq } from "..";
import { User, comments, users, type Comment } from "../schema";

export interface IComment_Users_FullJoin extends Comment {
  user: Pick<User, "id" | "name" | "image">;
}

interface ICommentsQueries {
  getByPostId: ({
    postId,
    limit,
    offset,
  }: {
    postId: string;
    limit: number;
    offset?: number;
  }) => Promise<IComment_Users_FullJoin[]>;
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

    return res as IComment_Users_FullJoin[];
  },
};
