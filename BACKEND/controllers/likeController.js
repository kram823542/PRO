const Like = require('../models/Like');
const Post = require('../models/Post');

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;

    console.log('🔍 Liking post...');
    console.log('Post ID:', postId);
    console.log('User ID:', req.user.id);

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'postId is required'
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

    // Check if already liked
    const existingLike = await Like.findOne({
      user: req.user.id,
      post: postId
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: 'Post already liked'
      });
    }

    // Create like
    const like = await Like.create({
      user: req.user.id,
      post: postId
    });

    // Update likes count in post
    await Post.findByIdAndUpdate(postId, {
      $inc: { likesCount: 1 }
    });

    console.log('✅ Post liked successfully');

    res.status(201).json({
      success: true,
      message: 'Post liked successfully',
      data: like
    });
  } catch (error) {
    console.log('❌ Like failed:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'postId is required'
      });
    }

    // Find and delete like
    const like = await Like.findOneAndDelete({
      user: req.user.id,
      post: postId
    });

    if (!like) {
      return res.status(404).json({
        success: false,
        message: 'Like not found'
      });
    }

    // Update likes count in post
    await Post.findByIdAndUpdate(postId, {
      $inc: { likesCount: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Post unliked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Check if user liked a post
exports.checkLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const like = await Like.findOne({
      user: req.user.id,
      post: postId
    });

    res.status(200).json({
      success: true,
      data: {
        liked: !!like
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get likes count for a post
exports.getLikesCount = async (req, res) => {
  try {
    const { postId } = req.params;

    const likesCount = await Like.countDocuments({ post: postId });

    res.status(200).json({
      success: true,
      data: {
        likesCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};