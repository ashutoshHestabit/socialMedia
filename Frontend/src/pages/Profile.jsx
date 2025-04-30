import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '@/features/posts/postSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const posts = useSelector((state) =>
    state.posts.items.filter((p) => p.author === user?._id)
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchPosts());
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <Avatar.Image src={user.avatarUrl || '/default-avatar.png'} />
          <Avatar.Fallback>{user.username.at(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        {posts.length === 0 && <p>You haven’t created any posts yet.</p>}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post._id}>
              <CardContent>
                <h3 className="text-lg font-medium">{post.title}</h3>
                <p className="mt-1 text-gray-700">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
