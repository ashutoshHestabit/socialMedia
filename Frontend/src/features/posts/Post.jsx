import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Comment from '@/features/comments/Comment';
import { createComment } from '@/features/comments/commentSlice';

export default function Post({ post, comments }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);

  const submitComment = () => {
    if (!userId) {
      return alert('You must be logged in to comment.');
    }
    if (!text.trim()) {
      return;
    }
    dispatch(createComment({
      post: post._id,
      author: userId,
      content: text.trim(),
    }));
    setText('');
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="mt-2">{post.content}</p>

        <div className="mt-4 space-y-2">
          {comments.map((c) => (
            <Comment key={c._id} comment={c} />
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Button onClick={submitComment} variant="default">
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
