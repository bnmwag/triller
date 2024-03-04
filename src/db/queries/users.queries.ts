import { db } from "..";
import { User } from "../schema";

interface IUserQueries {
  getById: (id: string) => Promise<User>;
}

export const userQueries: IUserQueries = {
  getById: async (id: string) => {
    const res = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return res as User;
  },
};
