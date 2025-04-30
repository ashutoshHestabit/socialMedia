import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '@/features/posts/postSlice';
import { fetchComments } from '@/features/comments/commentSlice';
import CreatePostForm from '@/features/posts/CreatePostForm';
import Post from '@/features/posts/Post';
import socket from '@/socket';

export default function Home() {
  const dispatch = useDispatch();

  // Safely get posts and comments with proper array fallbacks
  const posts = useSelector((s) => Array.isArray(s.posts.items) ? s.posts.items : []);
  const comments = useSelector((s) => Array.isArray(s.comments.items) ? s.comments.items : []);
  const postsStatus = useSelector((s) => s.posts.status);
  const commentsStatus = useSelector((s) => s.comments.status);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchPosts());
    dispatch(fetchComments());

    // Real-time updates
    socket.on('newPost', () => dispatch(fetchPosts()));
    socket.on('newComment', () => dispatch(fetchComments()));

    return () => {
      socket.off('newPost');
      socket.off('newComment');
    };
  }, [dispatch]);

  const handleCreate = async (data) => {
    await dispatch(createPost(data));
  };

  if (postsStatus === 'loading' || commentsStatus === 'loading') {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div className="p-4 text-center text-red-500">Error loading posts</div>;
  }

  return (
    <div className="p-4">
      <CreatePostForm onSubmit={handleCreate} />
      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          posts.map((p) => (
            <Post
              key={p._id}
              post={p}
              comments={comments.filter((c) => c.post === p._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}