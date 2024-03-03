import { db, desc, eq } from "..";
import { posts, users } from "../schema";

interface IPostsQueries {
  getAll: ({
    limit,
    offset,
  }: {
    limit: number;
    offset?: number;
  }) => Promise<any>;
  getById: (id: string) => Promise<any>;
}

export const postsQueries: IPostsQueries = {
  getAll: async ({ limit, offset = 0 }) => {
    const res = await db
      .select({
        id: posts.id,
        content: posts.content,
        createdAt: posts.createdAt,
        user: { id: users.id, name: users.name, image: users.image },
      })
      .from(posts)
      .fullJoin(users, eq(posts.userId, users.id))
      .orderBy(desc(posts.createdAt))
      .offset(offset)
      .limit(limit);

    return res;
  },
  getById: async (id: string) => {
    const res = await db
      .select({
        id: posts.id,
        content: posts.content,
        createdAt: posts.createdAt,
        user: { id: users.id, name: users.name, image: users.image },
      })
      .from(posts)
      .where(eq(posts.id, id))
      .fullJoin(users, eq(posts.userId, users.id));

    return res[0];
  },
};
