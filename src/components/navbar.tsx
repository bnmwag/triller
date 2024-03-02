"use client";

import { cn } from "@/lib/utils";
import { Bookmark, Heart, Home, Search, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

interface INavbarProps {}

export const Navbar: FC<INavbarProps> = ({}) => {
  const pathname = usePathname();

  const items = [
    { icon: Home, slug: "/" },
    { icon: Heart, slug: "/likes" },
    { icon: Search, slug: "/search" },
    { icon: Send, slug: "/inbox" },
    { icon: Bookmark, slug: "/saved" },
  ];

  return (
    <div className="flex h-full items-center justify-center gap-x-12">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link href={item.slug} key={index}>
            <Icon
              className={cn(
                "size-5",
                pathname === item.slug ? "text-primary" : "text-muted",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
};
