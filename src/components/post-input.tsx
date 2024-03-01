"use client";

import { Paperclip, Send } from "lucide-react";
import { User } from "@/types";
import type { FC } from "react";
import { useState, useRef } from "react"; // Import useState and useRef
import { ProfileAvatar } from "./profile";
import { Textarea } from "./ui/textarea";

interface IPostInputProps {
  user: User;
}

export const PostInput: FC<IPostInputProps> = ({ user }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;

    const { current: el } = textareaRef;
    const { value } = e.target;

    setText(value);

    el.style.height = "inherit";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <div className="grid grid-cols-[50px,1fr] border-b p-4">
      <div>
        <ProfileAvatar name={user.name} image={user.image} />
      </div>
      <form onSubmit={onSubmit}>
        <Textarea
          ref={textareaRef}
          className="min-h-0 resize-none rounded-none border-none px-0 text-base font-medium placeholder:text-muted-foreground focus-visible:ring-0"
          placeholder="Share your thoughts with the world..."
          rows={1}
          value={text}
          onChange={handleTextChange}
        />
        <div className="flex items-center justify-between">
          <div />
          {/* <button>
            <Paperclip className="size-4 text-muted-foreground" />
          </button> */}
          <button
            className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground"
            type="submit"
          >
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
