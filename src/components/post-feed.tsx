"use client";

import { PostUserFullJoin } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, type FC } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "./post";

interface IPostFeedProps {
  posts: PostUserFullJoin[];
  endpoint?: string;
  isCommentFeed?: boolean;
}

export const PostFeed: FC<IPostFeedProps> = ({
  posts,
  endpoint = "/api/posts",
  isCommentFeed,
}) => {
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 0 }): Promise<PostUserFullJoin[]> => {
    const res = await axios.get(endpoint + "?cursor=" + pageParam);

    return res.data;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [!isCommentFeed ? "posts" : "comments"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    initialData: { pages: [posts], pageParams: [0] }, // Add the pageParams property
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 10 ? allPages.length * 10 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div>
      {data &&
        data.pages?.map((page) =>
          page.map((post: any) => {
            if (!post.content) return null;
            return <Post key={post.id} post={post} />;
          }),
        )}
      {hasNextPage && <div ref={ref} />}
    </div>
  );
};
