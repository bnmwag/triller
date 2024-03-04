import { defaultResponse } from "@/lib/validators";
import { z } from "zod";

export const postsIdLikesValidator = {
  GET: {
    res: z.object({
      ...defaultResponse.shape,
      data: z.object({
        count: z.number(),
        hasLiked: z.boolean(),
      }),
    }),
  },
  POST: {
    res: z.object({ ...defaultResponse.shape }),
  },
};

export type TPostsIdLikesValidator = {
  GET: {
    res: z.infer<typeof postsIdLikesValidator.GET.res>;
  };
  POST: {
    res: z.infer<typeof postsIdLikesValidator.POST.res>;
  };
};
