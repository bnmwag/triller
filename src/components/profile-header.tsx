import { User } from "@/db/schema";
import type { FC } from "react";
import { ProfileAvatar } from "./profile";

interface IProfileHeaderProps {
  user: User;
}

export const ProfileHeader: FC<IProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex items-start gap-x-4 border-b p-4">
      <ProfileAvatar image={user.image} name={user.name} />
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-sm">{user.name}</h1>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <p className="text-balance">
          {"Labore in in culpa reprehenderit laborum non amet id ullamco."}
        </p>
      </div>
    </div>
  );
};
