import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Comment({ comment }) {
  return (
    <Card className="bg-gray-50">
      <CardContent>
        <p className="text-sm">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
