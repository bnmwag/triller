import { v4 } from "uuid";
import { and, db, eq } from "..";
import { likes } from "../schema";

interface ILikeQueries {
  getCountByPostId: (id: string) => Promise<number>;
  hasUserLiked: (postId: string, userId: string) => Promise<boolean>;
  create: (postId: string, userId: string) => Promise<void>;
  delete: (postId: string, userId: string) => Promise<void>;
}

export const likeQueries: ILikeQueries = {
  getCountByPostId: async (id: string) => {
    const res = await db.select().from(likes).where(eq(likes.postId, id));

    return res.length;
  },
  hasUserLiked: async (postId: string, userId: string) => {
    const res = await db
      .select({ id: likes.id })
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));

    return res.length > 0;
  },
  create: async (postId: string, userId: string) => {
    await db.insert(likes).values({ id: v4(), postId: postId, userId });
  },
  delete: async (postId: string, userId: string) => {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
  },
};
