import React, { useContext, useEffect, useState } from "react";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import CommentSection from "../components/CommentSection";
import FollowButton from "../components/FollowButton";
import LikeButton from "../components/LikeButton";

const Single = () => {
  const [post, setPost] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser?.id) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const fetchFollowerCount = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/follow/${userId}/followers`
      );
      setFollowerCount(res.data.length);
    } catch (err) {
      console.error("Error fetching follower count:", err);
    }
  };

  const fetchLikes = async (postId, userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/likes/${postId}`,
        {
          params: { userId },
          withCredentials: true,
        }
      );
      setLikes(res.data.totalLikes);
      setHasLiked(res.data.userLiked);
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };

  const toggleLike = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/v1/likes/${postId}`,
        {
          userId: currentUser.id,
        },
        { withCredentials: true }
      );

      fetchLikes(postId, currentUser.id);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Fetch post and related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/posts/${postId}`
        );
        const fetchedPost = res.data;
        setPost(fetchedPost);

        if (fetchedPost.userId) {
          fetchFollowerCount(fetchedPost.userId);
          fetchLikes(fetchedPost.id, currentUser.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId, currentUser.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) return <p className="text-2xl text-center mt-4">Loading...</p>;

  return (
    <div className="single max-w-3xl mx-auto p-6">
      <div className="content">
        {post.img && (
          <img
            src={`/uploads/${post.img}`}
            alt="post"
            className="w-full h-80 object-cover rounded-md"
          />
        )}

        <div className="user mt-4 flex items-center space-x-4">
          {post.userImg && (
            <img
              src={`/uploads/${post.userImg}`}
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">{post.username}</span>
              <span className="text-sm text-gray-500">
                ({followerCount} Followers)
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Posted {moment(post.date).fromNow()}
            </p>
          </div>

          {/* Follow Button (if not author) */}
          {currentUser?.id !== post.userId && (
            <FollowButton
              userId={post.userId}
              currentUser={currentUser}
              onFollowChange={() => fetchFollowerCount(post.userId)}
            />
          )}

          {/* Edit/Delete (if author) */}
          {currentUser?.id === post.userId && (
            <div className="edit ml-auto flex space-x-2">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={edit} alt="edit" className="w-6 h-6 cursor-pointer" />
              </Link>
              <img
                onClick={handleDelete}
                src={del}
                alt="delete"
                className="w-6 h-6 cursor-pointer text-red-500"
              />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{post.desc}</p>

        {/* Like Button */}
        <LikeButton likes={likes} hasLiked={hasLiked} onClick={toggleLike} />
      </div>

      <CommentSection postId={postId} currentUser={currentUser} />
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
