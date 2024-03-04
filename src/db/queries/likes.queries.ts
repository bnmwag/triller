import { db, eq } from "..";
import { likes } from "../schema";

interface ILikeQueries {
  getCountByPostId: (id: string) => Promise<any>;
}

export const likeQueries: ILikeQueries = {
  getCountByPostId: async (id: string) => {
    const res = await db.select().from(likes).where(eq(likes.postId, id));

    return res.length;
  },
};
