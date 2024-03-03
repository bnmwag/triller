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
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProfileAvatar } from "./profile";
import { Button } from "./ui/button";
import { notFound, useRouter } from "next/navigation";

dayjs.extend(relativeTime);

interface IPostDetailProps {
  post:
    | {
        id: string | null;
        content: string | null;
        createdAt: Date | null;
        user: {
          image: string | null;
          name: string | null;
          id: string;
        } | null;
      }
    | undefined;
}

export const PostDetail: FC<IPostDetailProps> = ({ post }) => {
  const router = useRouter();
  const [time, setTime] = useState<string>("----");

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

  const actions = [
    {
      icon: Heart,
      onClick: () => {},
    },
    {
      icon: MessageCircle,
      onClick: () => {
        router.push(`/posts/${post?.id}`);
      },
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
    <>
      <div className="grid grid-cols-[50px,1fr] gap-x-2 border-b p-4">
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
        </div>
      </div>
      <div className="flex justify-between border-b p-4">
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
    </>
  );
};
