import { defaultResponse } from "@/lib/validators";
import { z } from "zod";

export const postsIdCommentsValidator = {
  POST: {
    req: z.object({
      content: z
        .string()
        .min(1, { message: "Minimum of 1 character" })
        .max(280, { message: "Maximum of 280 characters" }),
    }),
    res: z.object({ ...defaultResponse.shape }),
  },
};

export type TPostsIdCommentsValidator = {
  POST: {
    req: z.infer<typeof postsIdCommentsValidator.POST.req>;
    res: z.infer<typeof postsIdCommentsValidator.POST.res>;
  };
};
