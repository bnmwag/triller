import { defaultResponse } from "@/lib/validators";
import { z } from "zod";

export const postsIdValidator = {
  GET: {
    res: z.object({
      id: z.string(),
      content: z.string(),
      createdAt: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
      }),
    }),
  },
  DELETE: {
    res: z.object({ ...defaultResponse.shape }),
  },
  PUT: {
    req: z.object({
      content: z
        .string()
        .min(1, { message: "Minimum of 1 character" })
        .max(280, { message: "Maximum of 280 characters" }),
    }),
    res: z.object({ ...defaultResponse.shape }),
  },
};

export type TPostsIdValidator = {
  GET: {
    res: z.infer<typeof postsIdValidator.GET.res>;
  };
  DELETE: {
    res: z.infer<typeof postsIdValidator.DELETE.res>;
  };
  PUT: {
    req: z.infer<typeof postsIdValidator.PUT.req>;
    res: z.infer<typeof postsIdValidator.PUT.res>;
  };
};
