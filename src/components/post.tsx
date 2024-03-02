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

dayjs.extend(relativeTime);

interface IPostProps {
  post: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
  };
}

export type Ref = HTMLDivElement;

export const Post = forwardRef<Ref, IPostProps>(({ post }, ref) => {
  const [time, setTime] = useState<string>("----");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(post.createdAt).fromNow());
    }, 500);

    return () => clearInterval(interval);
  }, [
    post.createdAt,
    useCallback(() => dayjs(post.createdAt).fromNow(), [post.createdAt]),
  ]);

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
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Heart className="size-4" />
          </Button>
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <MessageCircle className="size-4" />
          </Button>
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Repeat className="size-4" />
          </Button>
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
