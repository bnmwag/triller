"use client";

import { postsValidator } from "@/app/api/posts/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Send } from "lucide-react";
import { Session } from "next-auth";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ProfileAvatar } from "./profile";
import { Textarea } from "./ui/textarea";

interface IPostInputProps {
  user: Session["user"];
  postId?: string;
}

export const PostInput: FC<IPostInputProps> = ({ user, postId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(postsValidator.POST.req),
    defaultValues: { content: "" },
  });

  const isComment = !!postId;
  const content = form.watch("content");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        form.handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof postsValidator.POST.req>) => {
    try {
      setIsLoading(true);

      if (isComment) {
        await axios.post(`/api/posts/${postId}/comments`, values);
      } else {
        await axios.post("/api/posts", values);
      }

      toast.success(
        `Your ${!isComment ? "message" : "comment"} has been posted.`,
      );

      queryClient.invalidateQueries({
        queryKey: [!isComment ? "posts" : "comments"],
      });
      if (textareaRef.current) textareaRef.current.style.height = "inherit";
      form.reset();
    } catch (error) {
      toast.error(
        `An error occurred while posting your ${!isComment ? "message" : "comment"}.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[50px,1fr] border-b p-4">
      {!user?.name ? null : (
        <ProfileAvatar name={user.name} image={user.image} />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading}>
          <Textarea
            autoFocus
            className="min-h-0 resize-none rounded-none border-none px-0 text-base font-medium placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={
              !isComment
                ? "Share your thoughts with the world..."
                : "Reply to this post..."
            }
            rows={1}
            {...form.register("content")}
            ref={(e) => {
              // @ts-ignore
              if (e) textareaRef.current = e;
              form.register("content").ref(e);
            }}
          />
          <div className="flex items-center justify-end">
            <button
              className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground"
              type="submit"
            >
              <Send className="size-4" />
            </button>
          </div>
          {form.formState.errors.content && (
            <p className="text-red-500">
              {form.formState.errors.content.message}
            </p>
          )}
        </fieldset>
      </form>
    </div>
  );
};
