const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pages: Math.ceil(total / limit),
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create post - FIXED VERSION
exports.createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status, featuredImage } = req.body;

    console.log('='.repeat(60));
    console.log('🚀 CREATE POST STARTED');
    console.log('📸 Featured Image URL:', featuredImage);

    let finalImageUrl = '';
    
    // STEP 1: Cloudinary Upload with Enhanced Error Handling
    if (featuredImage && featuredImage.startsWith('http')) {
      try {
        console.log('🔄 Starting Cloudinary Upload...');
        
        // Cloudinary upload with timeout protection
        const uploadPromise = cloudinary.uploader.upload(featuredImage, {
          folder: 'vlog-posts',
          quality: 'auto',
          fetch_format: 'auto',
          timeout: 30000 // 30 seconds timeout
        });

        // Timeout handling
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Cloudinary upload timeout')), 30000);
        });

        const result = await Promise.race([uploadPromise, timeoutPromise]);
        
        finalImageUrl = result.secure_url;
        console.log('✅ CLOUDINARY UPLOAD SUCCESS!');
        console.log('🔗 Cloudinary URL:', finalImageUrl);
        console.log('🆔 Public ID:', result.public_id);
        
      } catch (uploadError) {
        console.log('❌ CLOUDINARY UPLOAD FAILED:', uploadError.message);
        console.log('⚠️ Using original image URL as fallback');
        finalImageUrl = featuredImage; // Fallback to original URL
      }
    } else {
      console.log('ℹ️ No image URL provided, using empty string');
      finalImageUrl = featuredImage || '';
    }

    // STEP 2: Create Post in Database
    console.log('💾 Saving to database...');
    console.log('🖼️ Final image URL to save:', finalImageUrl);

    const postData = {
      title: title || 'Untitled Post',
      content: content || '',
      excerpt: excerpt || '',
      category: category || 'Nature',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || 'draft',
      author: req.user.id,
      authorName: req.user.name,
      featuredImage: finalImageUrl
    };

    const post = await Post.create(postData);

    console.log('✅ POST CREATED SUCCESSFULLY!');
    console.log('📄 Post ID:', post._id);
    console.log('🖼️ Saved Image URL:', post.featuredImage);
    console.log('='.repeat(60));

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });

  } catch (error) {
    console.log('❌ POST CREATION FAILED:', error.message);
    console.log('🔄 Attempting to create post without image...');
    
    // Emergency fallback - create post without image
    try {
      const emergencyPost = await Post.create({
        title: req.body.title || 'Untitled Post',
        content: req.body.content || '',
        excerpt: req.body.excerpt || '',
        category: req.body.category || 'Nature',
        tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
        status: req.body.status || 'draft',
        author: req.user.id,
        authorName: req.user.name,
        featuredImage: req.body.featuredImage || '' // Use original URL directly
      });

      console.log('✅ EMERGENCY POST CREATED (without Cloudinary)');
      
      res.status(201).json({
        success: true,
        message: 'Post created (image upload skipped)',
        data: emergencyPost
      });
    } catch (emergencyError) {
      console.log('❌ EMERGENCY POST ALSO FAILED:', emergencyError.message);
      
      res.status(500).json({
        success: false,
        message: 'Post creation failed: ' + error.message
      });
    }
  }
};

// Update post - FIXED VERSION
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    let finalImageUrl = post.featuredImage;
    
    // Handle image update
    if (req.body.featuredImage && req.body.featuredImage.startsWith('http')) {
      try {
        console.log('🔄 Updating image on Cloudinary...');
        
        const result = await cloudinary.uploader.upload(req.body.featuredImage, {
          folder: 'vlog-posts',
          quality: 'auto',
          fetch_format: 'auto',
          timeout: 30000
        });
        
        finalImageUrl = result.secure_url;
        console.log('✅ Image update successful:', finalImageUrl);
      } catch (uploadError) {
        console.log('❌ Image update failed, keeping old image');
        // Keep the old image URL
      }
    }

    const updateData = {
      ...req.body,
      featuredImage: finalImageUrl,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : post.tags
    };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    // Delete image from Cloudinary if it exists
    if (post.featuredImage && post.featuredImage.includes('res.cloudinary.com')) {
      try {
        const urlParts = post.featuredImage.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        const publicIdWithVersion = urlParts.slice(uploadIndex + 2).join('/');
        const publicId = publicIdWithVersion.split('.')[0];
        
        await cloudinary.uploader.destroy(publicId);
        console.log('✅ Cloudinary image deleted:', publicId);
      } catch (deleteError) {
        console.log('⚠️ Cloudinary image delete failed:', deleteError.message);
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};