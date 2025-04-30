import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreatePostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Get the logged‐in user’s ID from Redux state
  const userId = useSelector((state) => state.auth.user?._id);

  const submit = (e) => {
    e.preventDefault();
    if (!userId) {
      return alert('You must be logged in to post.');
    }
    onSubmit({ title, content, author: userId });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="What’s on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit" variant="primary">
        Post
      </Button>
    </form>
  );
}
