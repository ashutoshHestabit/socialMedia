import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const createComment = async (req, res) => {
  try {
    const { post, author, content } = req.body;

    if (!post || !author || !content) {
      return res.status(400).json({ message: 'Post, author, and content are required' });
    }

    const postExists = await Post.findById(post);
    const userExists = await User.findById(author);

    if (!postExists) return res.status(404).json({ message: 'Post not found' });
    if (!userExists) return res.status(404).json({ message: 'Author not found' });

    const comment = await Comment.create({ post, author, content });

    res.status(201).json({
      message: 'Comment created successfully',
      comment,
    });

    const io = req.app.get('io');
    io.emit('newComment', comment);  // Notify all clients


  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment', error: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('post', 'title')
      .populate('author', 'username');

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
};
