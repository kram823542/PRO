// routes/posts.js - COMPLETE FIXED VERSION WITH PROPER LIKE SYSTEM & SUGGESTIONS
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts with categories
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    const categories = await Post.distinct('category');
    
    res.json({
      posts,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET SUGGESTED POSTS - ADDED THIS ROUTE
router.get('/suggestions', async (req, res) => {
  try {
    console.log("🎯 FETCHING SUGGESTED POSTS");
    
    // Get posts with highest engagement (likes + comments)
    const posts = await Post.find()
      .sort({ 
        'likes.count': -1,
        'comments.count': -1 
      })
      .limit(4)
      .select('title image likes comments category date author')
      .exec();

    console.log(`✅ FOUND ${posts.length} SUGGESTED POSTS`);

    res.json({ 
      success: true, 
      posts 
    });
  } catch (error) {
    console.error('❌ ERROR FETCHING SUGGESTIONS:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching suggestions' 
    });
  }
});

// ✅ LIKE A POST - COMPLETELY FIXED & SIMPLIFIED VERSION
// ✅ LIKE A POST - COMPLETELY FIXED VERSION (MongoDB Compatible)
router.post('/:id/like', async (req, res) => {
  try {
    console.log("❤️ LIKE REQUEST RECEIVED:", {
      postId: req.params.id,
      body: req.body
    });

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    const { userId, userName } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: 'User ID is required' 
      });
    }

    // ✅ INITIALIZE LIKES OBJECT IF NOT EXISTS
    if (!post.likes) {
      post.likes = {
        count: 0,
        likedBy: [] // This will store only user IDs as strings
      };
    }

    console.log("🔍 CURRENT LIKES STATUS:", {
      currentCount: post.likes.count,
      likedByUsers: post.likes.likedBy,
      incomingUserId: userId
    });

    // ✅ CHECK IF USER ALREADY LIKED THIS POST
    // Convert all likedBy entries to strings for comparison
    const likedByUserIds = post.likes.likedBy.map(like => {
      if (typeof like === 'object' && like.userId) {
        return like.userId.toString();
      }
      return like.toString();
    });

    const userAlreadyLiked = likedByUserIds.includes(userId.toString());

    console.log("🔍 USER LIKE CHECK:", {
      userId: userId,
      alreadyLiked: userAlreadyLiked,
      currentLikedBy: likedByUserIds
    });

    let newLikeCount = post.likes.count;
    let newLikeStatus;

    if (userAlreadyLiked) {
      // ✅ USER ALREADY LIKED - UNLIKE THE POST
      // Remove user from likedBy array (handle both object and string formats)
      post.likes.likedBy = post.likes.likedBy.filter(like => {
        if (typeof like === 'object' && like.userId) {
          return like.userId.toString() !== userId.toString();
        }
        return like.toString() !== userId.toString();
      });
      
      newLikeCount = Math.max(0, newLikeCount - 1);
      newLikeStatus = false;
      console.log(`👎 USER ${userId} UNLIKED POST`);
    } else {
      // ✅ USER HASN'T LIKED - LIKE THE POST
      // Store only user ID as string (MongoDB compatible)
      post.likes.likedBy.push(userId.toString());
      newLikeCount += 1;
      newLikeStatus = true;
      console.log(`👍 USER ${userId} LIKED POST`);
    }

    // ✅ UPDATE LIKE COUNT
    post.likes.count = newLikeCount;

    // ✅ SAVE THE UPDATED POST
    await post.save();

    console.log("✅ LIKE ACTION COMPLETED:", {
      newLikeCount: newLikeCount,
      totalLikers: post.likes.likedBy.length,
      userLiked: newLikeStatus,
      allLikers: post.likes.likedBy
    });

    // ✅ SEND SUCCESS RESPONSE
    res.json({ 
      success: true, 
      likes: newLikeCount,
      liked: newLikeStatus,
      totalLikers: post.likes.likedBy.length,
      message: newLikeStatus ? 'Post liked successfully!' : 'Post unliked successfully!'
    });

  } catch (error) {
    console.error("❌ ERROR IN LIKE ROUTE:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});


// ✅ FIXED: Add comment to post with proper _id
router.post('/:id/comments', async (req, res) => {
  try {
    console.log("📝 ADD COMMENT REQUEST:", req.body);
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { name, comment, userId } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    // ✅ FIX: Manually generate _id for comment
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      name: name.trim(),
      comment: comment.trim(),
      date: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=0D8ABC&color=fff&bold=true`,
      userId: userId || null
    };

    console.log("💾 CREATING COMMENT WITH ID:", newComment._id);

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.unshift(newComment);
    await post.save();

    console.log("✅ COMMENT SAVED WITH ID:", newComment._id);

    res.json({ 
      success: true, 
      comment: newComment 
    });
  } catch (error) {
    console.error("❌ ERROR IN COMMENT CREATION:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ 
      success: true, 
      comments: post.comments || [] 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit comment - FIXED
router.put('/:postId/comments/:commentId', async (req, res) => {
  try {
    console.log("✏️ EDIT COMMENT REQUEST RECEIVED:", {
      postId: req.params.postId,
      commentId: req.params.commentId,
      body: req.body
    });

    if (!req.params.postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    if (!req.params.commentId || req.params.commentId === 'undefined') {
      return res.status(400).json({ message: 'Valid comment ID is required' });
    }

    if (!req.body.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!req.body.comment) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log("📄 POST FOUND, TOTAL COMMENTS:", post.comments.length);

    // ✅ FIX: Better comment finding
    const comment = post.comments.find(c => {
      if (!c._id) return false;
      return c._id.toString() === req.params.commentId;
    });

    if (!comment) {
      console.log("❌ COMMENT NOT FOUND. Available IDs:", post.comments.map(c => c._id));
      return res.status(404).json({ message: 'Comment not found' });
    }

    console.log("✅ COMMENT FOUND:", comment);

    if (!comment.userId) {
      return res.status(403).json({ message: 'This comment cannot be edited' });
    }

    if (comment.userId.toString() !== req.body.userId) {
      return res.status(403).json({ message: 'You can only edit your own comments' });
    }

    const commentTime = new Date(comment.date).getTime();
    const currentTime = new Date().getTime();
    const fifteenMinutes = 15 * 60 * 1000;
    
    if ((currentTime - commentTime) > fifteenMinutes) {
      return res.status(400).json({ message: 'Comment can only be edited within 15 minutes' });
    }

    comment.comment = req.body.comment;
    comment.edited = true;
    comment.editedAt = new Date();
    
    await post.save();

    console.log("✅ COMMENT UPDATED SUCCESSFULLY");

    res.json({ 
      success: true, 
      comment: comment 
    });

  } catch (error) {
    console.error("❌ ERROR IN EDIT COMMENT ROUTE:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🚀 DELETE COMMENT - COMPLETELY FIXED & ENHANCED
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    console.log("🗑️ DELETE COMMENT REQUEST START");
    console.log("📦 REQUEST PARAMS:", {
      postId: req.params.postId,
      commentId: req.params.commentId
    });

    // ✅ STEP 1: VALIDATE INPUTS
    if (!req.params.postId) {
      console.log("❌ VALIDATION FAILED: MISSING POST ID");
      return res.status(400).json({ 
        success: false,
        message: 'Post ID is required' 
      });
    }

    if (!req.params.commentId || req.params.commentId === 'undefined') {
      console.log("❌ VALIDATION FAILED: INVALID COMMENT ID:", req.params.commentId);
      return res.status(400).json({ 
        success: false,
        message: 'Valid comment ID is required' 
      });
    }

    if (!req.body.userId) {
      console.log("❌ VALIDATION FAILED: MISSING USER ID");
      return res.status(400).json({ 
        success: false,
        message: 'User ID is required' 
      });
    }

    console.log("✅ STEP 1: INPUT VALIDATION PASSED");

    // ✅ STEP 2: FIND POST
    console.log("🔍 STEP 2: FINDING POST...");
    const post = await Post.findById(req.params.postId);
    if (!post) {
      console.log("❌ POST NOT FOUND:", req.params.postId);
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    console.log("✅ POST FOUND:", post._id);
    console.log("📊 TOTAL COMMENTS IN POST:", post.comments ? post.comments.length : 0);

    // ✅ STEP 3: FIND COMMENT
    console.log("🔍 STEP 3: FINDING COMMENT...");
    console.log("🎯 LOOKING FOR COMMENT ID:", req.params.commentId);
    
    if (!post.comments || post.comments.length === 0) {
      console.log("❌ NO COMMENTS FOUND IN POST");
      return res.status(404).json({ 
        success: false,
        message: 'No comments found in this post' 
      });
    }

    const comment = post.comments.find(c => {
      if (!c._id) {
        console.log("⚠️ COMMENT WITH NO _id FOUND:", c);
        return false;
      }
      
      const commentIdStr = c._id.toString();
      const isMatch = commentIdStr === req.params.commentId;
      
      return isMatch;
    });

    if (!comment) {
      console.log("❌ COMMENT NOT FOUND IN POST");
      return res.status(404).json({ 
        success: false,
        message: 'Comment not found' 
      });
    }

    console.log("✅ COMMENT FOUND:", {
      _id: comment._id.toString(),
      name: comment.name,
      userId: comment.userId
    });

    // ✅ STEP 4: CHECK PERMISSIONS
    console.log("🔐 STEP 4: CHECKING PERMISSIONS...");
    console.log("👤 COMMENT USER ID:", comment.userId);
    console.log("👤 REQUEST USER ID:", req.body.userId);
    console.log("👑 IS ADMIN:", req.body.isAdmin);

    const isCommentAuthor = comment.userId && comment.userId.toString() === req.body.userId.toString();
    const isAdmin = req.body.isAdmin === true;
    const canDelete = isCommentAuthor || isAdmin;

    console.log("🔐 PERMISSION CHECK RESULTS:", {
      isCommentAuthor,
      isAdmin, 
      canDelete
    });

    if (!canDelete) {
      console.log("❌ PERMISSION DENIED: User cannot delete this comment");
      return res.status(403).json({ 
        success: false,
        message: 'You can only delete your own comments' 
      });
    }

    console.log("✅ STEP 4: PERMISSION CHECK PASSED");

    // ✅ STEP 5: DELETE COMMENT
    console.log("🗑️ STEP 5: DELETING COMMENT...");
    const initialCommentCount = post.comments.length;
    console.log("📊 COMMENTS BEFORE DELETE:", initialCommentCount);

    // Filter out the comment to delete
    post.comments = post.comments.filter(c => {
      if (!c._id) return true;
      return c._id.toString() !== req.params.commentId;
    });

    const finalCommentCount = post.comments.length;
    console.log("📊 COMMENTS AFTER DELETE:", finalCommentCount);

    if (initialCommentCount === finalCommentCount) {
      console.log("❌ COMMENT WAS NOT REMOVED FROM ARRAY");
      return res.status(500).json({ 
        success: false,
        message: 'Failed to delete comment from database' 
      });
    }

    console.log("✅ COMMENT REMOVED FROM ARRAY");

    // ✅ STEP 6: SAVE POST
    console.log("💾 STEP 6: SAVING POST...");
    await post.save();
    console.log("✅ POST SAVED SUCCESSFULLY");

    // ✅ STEP 7: SEND SUCCESS RESPONSE
    console.log("🎉 DELETE COMMENT SUCCESS");
    res.json({ 
      success: true, 
      message: 'Comment deleted successfully',
      deletedCommentId: req.params.commentId,
      remainingComments: finalCommentCount
    });

  } catch (error) {
    console.error("💥 DELETE COMMENT ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Internal server error during comment deletion'
    });
  }
});

// Create new post
router.post('/', async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      author: req.body.author,
      date: req.body.date || new Date(),
      category: req.body.category,
      tags: req.body.tags || [],
      image: req.body.image
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.excerpt) post.excerpt = req.body.excerpt;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;
    if (req.body.category) post.category = req.body.category;
    if (req.body.tags) post.tags = req.body.tags;
    if (req.body.image) post.image = req.body.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;