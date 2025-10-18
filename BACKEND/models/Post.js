// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please add a title'],
//     trim: true,
//     maxlength: [200, 'Title cannot be more than 200 characters']
//   },
//   content: {
//     type: String,
//     required: [true, 'Please add content']
//   },
//   excerpt: {
//     type: String,
//     required: [true, 'Please add an excerpt'],
//     maxlength: [500, 'Excerpt cannot be more than 500 characters']
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   authorName: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ['Nature', 'Climate', 'Photography', 'Travel', 'Technology'],
//     default: 'Nature'
//   },
//   tags: [{
//     type: String
//   }],
//   status: {
//     type: String,
//     enum: ['draft', 'published'],
//     default: 'draft'
//   },
//   featuredImage: {
//     type: String,
//     default: ''
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   // New fields for likes and comments count
//   likesCount: {
//     type: Number,
//     default: 0
//   },
//   commentsCount: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Post', postSchema);

// models/Post.js
// models/Post.js में commentSchema update करें



const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: null
  },
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date,
    default: null
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: ''
  },
  likes: {
    count: {
      type: Number,
      default: 0
    },
    likedBy: [{
      type: String
    }]
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

// Add text index for search functionality
postSchema.index({
  title: 'text',
  excerpt: 'text',
  content: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Post', postSchema);