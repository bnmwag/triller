import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Send,
} from "lucide-react";
import { forwardRef } from "react";
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
  const time = dayjs().to(dayjs(post.createdAt), true);
  return (
    <div ref={ref} className="grid grid-cols-[50px,1fr] border-b p-4">
      <div>
        <ProfileAvatar image={post.user.image} name={post.user.name} />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm">{post.user.name}</h2>
          <div className="flex items-center gap-x-4">
            <span className="text-sm text-muted">{time}</span>
            <MoreHorizontal className="size-4" />
          </div>
        </div>
        <p className="w-full">{post.content}</p>
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
