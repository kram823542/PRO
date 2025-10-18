const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const comments = await Comment.find({ post: postId, parentComment: null })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentComment: comment._id })
          .populate('author', 'name email')
          .sort({ createdAt: 1 });
        return {
          ...comment.toObject(),
          replies
        };
      })
    );

    const total = await Comment.countDocuments({ post: postId, parentComment: null });

    res.status(200).json({
      success: true,
      count: comments.length,
      total,
      pages: Math.ceil(total / limit),
      data: commentsWithReplies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create comment
exports.createComment = async (req, res) => {
  try {
    const { content, postId, parentCommentId } = req.body;

    console.log('🔍 Creating comment...');
    console.log('Content:', content);
    console.log('Post ID:', postId);
    console.log('User ID:', req.user.id);

    if (!content || !postId) {
      return res.status(400).json({
        success: false,
        message: 'Content and postId are required'
      });
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      authorName: req.user.name,
      post: postId,
      parentComment: parentCommentId || null
    });

    // Update comments count in post
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 }
    });

    // Populate author info for response
    await comment.populate('author', 'name email');

    console.log('✅ Comment created successfully:', comment._id);

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment
    });
  } catch (error) {
    console.log('❌ Comment creation failed:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user owns the comment
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment'
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { 
        content,
        isEdited: true 
      },
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user owns the comment or is admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    // Delete comment and its replies
    await Comment.deleteMany({
      $or: [
        { _id: id },
        { parentComment: id }
      ]
    });

    // Update comments count in post
    await Post.findByIdAndUpdate(comment.post, {
      $inc: { commentsCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};