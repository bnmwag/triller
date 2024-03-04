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

  const [data, setData] = useState({
    hasLiked: false,
    count: 0,
  });

  useEffect(() => {
    if (!post || !user) return;

    axios.get(`/api/posts/${post.id}/likes`).then((res) => {
      setData(res.data.data);
    });
  }, [post, user]);

  const toggleLike = async () => {
    if (!post || !user) return;

    await axios.post(`/api/posts/${post.id}/likes`);
  };

  return { data, toggleLike };
};
