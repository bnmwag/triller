import { db, desc, eq } from "..";
import { User, posts, users, type Post } from "../schema";

interface IPost_Users_FullJoin extends Post {
  user: Pick<User, "id" | "name" | "image">;
}

interface IPostsQueries {
  getAll: ({
    limit,
    offset,
  }: {
    limit: number;
    offset?: number;
  }) => Promise<IPost_Users_FullJoin[]>;
  getById: (id: string) => Promise<IPost_Users_FullJoin>;
  deleteById: (id: string) => Promise<{ deletedId: string } | undefined>;
  getAllByUserId: (userId: string) => Promise<IPost_Users_FullJoin[]>;
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

    return res as IPost_Users_FullJoin[];
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

    return res[0] as IPost_Users_FullJoin;
  },
  deleteById: async (id: string) => {
    const res = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({ deletedId: posts.id });

    return res[0];
  },
  getAllByUserId: async (userId: string) => {
    const res = await db
      .select({
        id: posts.id,
        content: posts.content,
        createdAt: posts.createdAt,
        user: { id: users.id, name: users.name, image: users.image },
      })
      .from(posts)
      .fullJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt));

    return res as IPost_Users_FullJoin[];
  },
};
