import axios from "axios";
import { useEffect, useState } from "react";
import usePost from "./use-post";
import { useSessionUser } from "./use-session-user";

interface IUseLikeArgs {
  postId: string | null | undefined;
}

export const useLike = ({ postId }: IUseLikeArgs) => {
  const { data: post } = usePost(postId);
  const user = useSessionUser();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [data, setData] = useState({
    hasLiked: false,
    count: 0,
  });

  useEffect(() => {
    setIsLiked(data.hasLiked);
    setLikeCount(data.count);
  }, [data]);

  useEffect(() => {
    if (!post || !user) return;

    axios.get(`/api/posts/${post.id}/likes`).then((res) => {
      setData(res.data.data);
    });
  }, [post, user]);

  const toggleLike = () => {
    if (!post || !user) return;

    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      axios.post(`/api/posts/${post.id}/likes`);
    } catch (error) {
      // Revert optimistic update if API call fails
      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
    }
  };

  return { data, toggleLike, isLiked, likeCount };
};
