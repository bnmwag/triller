import { Post, User } from "./db/schema";

export interface PostUserFullJoin {
  id: Post["id"] | null;
  content: Post["content"] | null;
  user: {
    id: User["id"];
    name: User["name"];
    image: User["image"];
  } | null;
}
