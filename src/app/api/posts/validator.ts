import { defaultResponse } from "@/lib/validators";
import { z } from "zod";

export const postsValidator = {
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

export type TPostsValidator = {
  POST: {
    req: z.infer<typeof postsValidator.POST.req>;
    res: z.infer<typeof postsValidator.POST.res>;
  };
};
