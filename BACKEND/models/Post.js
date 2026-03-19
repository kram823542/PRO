// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     image: {
//         public_id: {
//             type: String,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     },
//     category: {
//         type: String,
//         default: 'General'
//     },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Admin',
//         required: true
//     },
//     tags: [String],
//     views: {
//         type: Number,
//         default: 0
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Post', postSchema);


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // Basic Info
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    credit: {
        type: String,
        required: [true, 'Credit is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    
    // Work Details
    workingText: {
        type: String,
        required: [true, 'Working text is required']
    },
    workPlaceName: {
        type: String,
        required: [true, 'Work place name is required'],
        trim: true
    },
    
    // Team Photos (Array for multiple images)
    teamPhotos: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            default: ''
        }
    }],
    
    // Meeting Output
    meetingOutput: {
        type: String,
        required: [true, 'Meeting output is required']
    },
    
    // Category and Tags
    category: {
        type: String,
        default: 'General'
    },
    tags: [String],
    
    // Author and Metadata
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    
    // Status
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for search functionality
postSchema.index({ 
    title: 'text', 
    description: 'text', 
    workingText: 'text',
    name: 'text',
    workPlaceName: 'text' 
});

module.exports = mongoose.model('Post', postSchema);