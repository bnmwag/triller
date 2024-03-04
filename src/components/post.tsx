"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Send,
} from "lucide-react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ProfileAvatar } from "./profile";
import { Button } from "./ui/button";
import { notFound, useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useLike } from "@/hooks/use-like";

dayjs.extend(relativeTime);

interface IPostProps {
  post:
    | {
        id: string | null;
        content: string | null;
        createdAt: Date | null;
        isLiked: boolean;
        user: {
          image: string | null;
          name: string | null;
          id: string;
        } | null;
      }
    | undefined;
}

export type Ref = HTMLDivElement;

export const Post = forwardRef<Ref, IPostProps>(({ post }, ref) => {
  const router = useRouter();
  const [time, setTime] = useState<string>("----");

  const { data, toggleLike } = useLike({ postId: post?.id });

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setIsLiked(data.hasLiked);
    setLikeCount(data.count);
  }, [data]);

  useEffect(() => {
    if (!post) return;

    const interval = setInterval(() => {
      setTime(dayjs(post.createdAt).fromNow());
    }, 500);

    return () => clearInterval(interval);
  }, [
    post?.createdAt,
    useCallback(() => dayjs(post?.createdAt).fromNow(), [post?.createdAt]),
  ]);

  const handleLike = async () => {
    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      await toggleLike();
      // The API can return the new total number of likes and status,
      // which you can use to update the state accurately.
    } catch (error) {
      // Revert optimistic update if API call fails
      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
    }
  };

  const actions = [
    {
      icon: MessageCircle,
      onClick: () => router.push(`/posts/${post?.id}`),
    },
    {
      icon: Repeat,
      onClick: () => {},
    },
    {
      icon: Send,
      onClick: () => {},
    },
  ];

  if (!post || !post.user) return notFound();

  return (
    <div ref={ref} className="grid grid-cols-[50px,1fr] gap-x-2 border-b p-4">
      <div className="flex flex-col items-center gap-y-4">
        <ProfileAvatar image={post.user.image} name={post.user.name} />
        <div className="w-px flex-1 bg-muted" />
        <div className="p-2"></div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm">{post.user.name}</h2>
          <div className="flex items-center gap-x-4">
            <span className="text-sm text-muted">{time}</span>
            <MoreHorizontal className="size-4" />
          </div>
        </div>
        <p className="w-full text-pretty">{post.content}</p>
        <div className="flex">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-8"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "size-4",
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-white",
              )}
            />
            <span className="pl-1">{likeCount}</span>
          </Button>
          {actions.map(({ icon, onClick }, index) => {
            const Icon = icon;

            return (
              <Button
                size={"icon"}
                variant={"ghost"}
                className="size-8"
                key={`${post.id}-actions-${index}`}
                onClick={onClick}
              >
                <Icon className="size-4" />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
