import { db } from "..";

interface IUserQueries {
  getById: (id: string) => Promise<any>;
}

export const userQueries: IUserQueries = {
  getById: async (id: string) => {
    const res = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return res;
  },
};
