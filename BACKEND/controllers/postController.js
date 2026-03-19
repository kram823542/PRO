const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;

// @desc    Create a new post
// @route   POST /api/posts
// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res) => {
    try {
        const {
            name,
            credit,
            title,
            description,
            workingText,
            workPlaceName,
            meetingOutput,
            category,
            tags,
            teamPhotos  // ये JSON array से आएगा
        } = req.body;

        console.log('📝 Creating new post...');
        console.log('Files received:', req.files ? req.files.length : 0);
        console.log('TeamPhotos from body:', teamPhotos);

        // Validation
        if (!name || !credit || !title || !description || !workingText || !workPlaceName || !meetingOutput) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        // Process team photos - दोनों तरीके support करें
        let processedTeamPhotos = [];

        // अगर files upload हुई हैं
        if (req.files && req.files.length > 0) {
            processedTeamPhotos = req.files.map((file, index) => ({
                public_id: file.filename,
                url: file.path,
                caption: req.body[`caption_${index}`] || ''
            }));
        }
        // अगर JSON में URLs भेजे हैं
        else if (teamPhotos) {
            // Parse अगर string है तो
            if (typeof teamPhotos === 'string') {
                try {
                    processedTeamPhotos = JSON.parse(teamPhotos);
                } catch (e) {
                    processedTeamPhotos = [];
                }
            } 
            // अगर already array है
            else if (Array.isArray(teamPhotos)) {
                processedTeamPhotos = teamPhotos;
            }
        }

        // Check if at least one photo is provided
        if (processedTeamPhotos.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least 1 team photo or provide photo URLs'
            });
        }

        if (processedTeamPhotos.length > 5) {
            return res.status(400).json({
                success: false,
                message: 'Maximum 5 images allowed'
            });
        }

        // Create post
        const post = await Post.create({
            name,
            credit,
            title,
            description,
            workingText,
            workPlaceName,
            teamPhotos: processedTeamPhotos,
            meetingOutput,
            category: category || 'General',
            tags: tags ? (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags) : [],
            author: req.admin._id,
            isPublished: true
        });

        console.log('✅ Post created successfully:', post._id);

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post
        });

    } catch (error) {
        console.error('❌ Error creating post:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            search,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        // Build query
        let query = { isPublished: true };
        
        if (category) {
            query.category = category;
        }
        
        if (search) {
            query.$text = { $search: search };
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort order
        const sortOrder = order === 'desc' ? -1 : 1;
        const sort = { [sortBy]: sortOrder };

        // Execute query
        const posts = await Post.find(query)
            .populate('author', 'username email')
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        // Get total count
        const total = await Post.countDocuments(query);

        res.json({
            success: true,
            data: posts,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                itemsPerPage: limitNum
            }
        });

    } catch (error) {
        console.error('❌ Error fetching posts:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username email');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Increment views
        post.views += 1;
        await post.save();

        res.json({
            success: true,
            data: post
        });

    } catch (error) {
        console.error('❌ Error fetching post:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Check authorization
        if (post.author.toString() !== req.admin._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this post'
            });
        }

        // Update basic fields
        const updateFields = [
            'name', 'credit', 'title', 'description',
            'workingText', 'workPlaceName', 'meetingOutput',
            'category', 'isPublished'
        ];

        updateFields.forEach(field => {
            if (req.body[field] !== undefined) {
                post[field] = req.body[field];
            }
        });

        // Update tags if provided
        if (req.body.tags) {
            post.tags = req.body.tags.split(',').map(tag => tag.trim());
        }

        // Handle new photos if uploaded
        if (req.files && req.files.length > 0) {
            // Delete old photos from Cloudinary
            for (const photo of post.teamPhotos) {
                await cloudinary.uploader.destroy(photo.public_id);
            }

            // Add new photos
            const newPhotos = req.files.map((file, index) => ({
                public_id: file.filename,
                url: file.path,
                caption: req.body[`new_caption_${index}`] || ''
            }));

            post.teamPhotos = newPhotos;
        }

        // Handle photo captions update
        if (req.body.captions) {
            const captions = JSON.parse(req.body.captions);
            post.teamPhotos = post.teamPhotos.map((photo, index) => ({
                ...photo,
                caption: captions[index] || photo.caption
            }));
        }

        const updatedPost = await post.save();

        res.json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost
        });

    } catch (error) {
        console.error('❌ Error updating post:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Debug logs to see what's happening
        console.log('🔍 Post author:', post.author.toString());
        console.log('🔍 Request admin:', req.admin._id.toString());
        console.log('🔍 Admin isAdmin:', req.admin.isAdmin);

        // Check authorization - allow if user is admin OR is the author
        if (!req.admin.isAdmin && post.author.toString() !== req.admin._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this post'
            });
        }

        // Delete all photos from Cloudinary
        if (post.teamPhotos && post.teamPhotos.length > 0) {
            for (const photo of post.teamPhotos) {
                if (photo.public_id) {
                    await cloudinary.uploader.destroy(photo.public_id);
                }
            }
        }

        await post.deleteOne();

        res.json({
            success: true,
            message: 'Post deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting post:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Get posts by author
// @route   GET /api/posts/author/:authorId
const getPostsByAuthor = async (req, res) => {
    try {
        const posts = await Post.find({ 
            author: req.params.authorId,
            isPublished: true 
        })
        .populate('author', 'username email')
        .sort('-createdAt');

        res.json({
            success: true,
            data: posts
        });

    } catch (error) {
        console.error('❌ Error fetching author posts:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get posts by category
// @route   GET /api/posts/category/:category
const getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({ 
            category: req.params.category,
            isPublished: true 
        })
        .populate('author', 'username email')
        .sort('-createdAt');

        res.json({
            success: true,
            data: posts
        });

    } catch (error) {
        console.error('❌ Error fetching category posts:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsByAuthor,
    getPostsByCategory
};