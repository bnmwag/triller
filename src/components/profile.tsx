import { Session } from "next-auth";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface IProfileProps {
  user: Session["user"];
}

export const Profile: FC<IProfileProps> = ({ user }) => {
  if (!user || !user.name) return <div>USER NOT FOUND</div>;

  return (
    <div className="space-y-6">
      <ProfileAvatar name={user.name} image={user.image} className="size-24" />
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <p className="text-balance">
        {"Labore in in culpa reprehenderit laborum non amet id ullamco."}
      </p>
    </div>
  );
};

interface IProfileAvatarProps {
  name: string | null;
  image: string | null | undefined;
  className?: string;
}

export const ProfileAvatar: FC<IProfileAvatarProps> = ({
  name,
  image,
  className,
}) => {
  return (
    <Avatar className={cn(className)}>
      {image ? (
        <AvatarImage src={image} alt={name || "profile image"} />
      ) : (
        <AvatarFallback>
          {(name &&
            name
              .split(" ")
              .map((name) => name[0])
              .join("")) ||
            "U"}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
