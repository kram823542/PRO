import React, { useState } from 'react';

const PostForm = ({ setShowPostForm, updateProgress, progress, onPostCreated }) => {
  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Research',
    tags: '',
    authorName: '',
    image: null,
    imagePreview: null
  });
  const [formLoading, setFormLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  // Modern Professional Color Palette (same as PostsTab)
  const colors = {
    primary: '#6366f1',      // Indigo
    primaryLight: '#818cf8', // Light Indigo
    secondary: '#06b6d4',    // Cyan
    accent: '#f59e0b',       // Amber
    dark: '#0f172a',         // Dark Slate
    darkLight: '#1e293b',    // Light Dark
    light: '#f8fafc',        // Light Background
    text: '#1e293b',         // Text
    textLight: '#64748b',    // Light Text
    success: '#10b981',      // Emerald
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    card: '#ffffff',         // White
    cardDark: '#1e293b'      // Dark Card
  };

  const API_BASE_URL = 'http://localhost:5000/api';

  // Upload image to Cloudinary with progress tracking
  const uploadImageToCloudinary = async (imageFile) => {
    try {
      setUploadProgress(0);
      setUploadError('');
      updateProgress('Image Upload', 10, 'Preparing image for upload...');

      const formData = new FormData();
      formData.append('image', imageFile);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            const progressValue = Math.round(percentComplete);
            setUploadProgress(progressValue);
            updateProgress('Image Upload', 10 + progressValue * 0.8, `Uploading image... ${progressValue}%`);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success) {
                updateProgress('Image Upload', 100, 'Image uploaded successfully!');
                resolve(response.imageUrl);
              } else {
                reject(new Error(response.message || 'Image upload failed'));
              }
            } catch (error) {
              reject(new Error('Invalid response from server'));
            }
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.open('POST', `${API_BASE_URL}/upload/image`);
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  // Create new post with comprehensive progress tracking
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setUploadError('');
    setUploadProgress(0);

    try {
      updateProgress('Authentication', 10, 'Verifying admin access...');
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      let imageUrl = '';
      
      // Upload image if selected
      if (postForm.image) {
        try {
          updateProgress('Image Processing', 20, 'Processing image file...');
          imageUrl = await uploadImageToCloudinary(postForm.image);
          setUploadProgress(100);
        } catch (uploadError) {
          setUploadError(`Image upload failed: ${uploadError.message}`);
          updateProgress('Error', 0, `Image upload failed: ${uploadError.message}`);
          throw uploadError;
        }
      }

      // Create post data
      updateProgress('Post Creation', imageUrl ? 80 : 60, 'Creating blog post...');
      
      const postData = {
        title: postForm.title,
        excerpt: postForm.excerpt,
        content: postForm.content,
        category: postForm.category,
        tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: imageUrl,
        author: 'admin',
        authorName: postForm.authorName || 'Admin'
      };

      console.log('Sending post data:', postData);

      // Create post with better response handling
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      updateProgress('Saving', 90, 'Saving post to database...');

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        if (response.ok) {
          console.log('Post created successfully (non-JSON response)');
          updateProgress('Complete', 100, 'Post created successfully!');
          
          setTimeout(() => {
            alert('✅ Post created successfully!');
            setShowPostForm(false);
            setPostForm({
              title: '',
              excerpt: '',
              content: '',
              category: 'Research',
              tags: '',
              authorName: '',
              image: null,
              imagePreview: null
            });
            setUploadProgress(0);
            updateProgress('', 0, '');
            if (onPostCreated) onPostCreated();
          }, 1000);
          return;
        } else {
          throw new Error('Server returned invalid response');
        }
      }

      if (response.ok && (data.success || data._id)) {
        updateProgress('Complete', 100, 'Post created successfully!');
        
        setTimeout(() => {
          alert('✅ Post created successfully!');
          setShowPostForm(false);
          setPostForm({
            title: '',
            excerpt: '',
            content: '',
            category: 'Research',
            tags: '',
            authorName: '',
            image: null,
            imagePreview: null
          });
          setUploadProgress(0);
          updateProgress('', 0, '');
          if (onPostCreated) onPostCreated();
        }, 1000);
      } else {
        throw new Error(data.message || `Failed to create post: ${response.status}`);
      }

    } catch (error) {
      console.error('Post creation error:', error);
      updateProgress('Error', 0, `Failed: ${error.message}`);
      
      if (!error.message.includes('invalid response') && !error.message.includes('JSON')) {
        setTimeout(() => {
          alert(`❌ Failed to create post: ${error.message}`);
        }, 500);
      }
    } finally {
      setTimeout(() => {
        setFormLoading(false);
      }, 2000);
    }
  };

  // Handle image selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('❌ Please select an image file (JPG, PNG, WebP)');
        return;
      }

      setPostForm({
        ...postForm,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
      setUploadError('');
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100" style={{ backgroundColor: colors.light }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Create New Post
              </h2>
              <p className="mt-1 text-sm" style={{ color: colors.textLight }}>
                Craft engaging content for your audience
              </p>
            </div>
            <button
              onClick={() => {
                setShowPostForm(false);
                setUploadProgress(0);
                setUploadError('');
                updateProgress('', 0, '');
              }}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
              style={{ color: colors.textLight }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="p-8">
            {/* Progress Tracking in Form */}
            {(progress.step || uploadProgress > 0) && (
              <div className="mb-6 p-4 rounded-xl border" 
                   style={{ 
                     backgroundColor: `${colors.primary}08`, 
                     borderColor: `${colors.primary}20` 
                   }}>
                <div className="flex justify-between text-sm font-medium mb-2" style={{ color: colors.primary }}>
                  <span>{progress.step || 'Uploading Image'}</span>
                  <span>{progress.percentage || uploadProgress}%</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: `${colors.primary}20` }}>
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${progress.percentage || uploadProgress}%`, 
                      backgroundColor: colors.primary 
                    }}
                  ></div>
                </div>
                {progress.message && (
                  <p className="text-xs mt-2" style={{ color: colors.textLight }}>{progress.message}</p>
                )}
              </div>
            )}

            {/* Upload Error Display */}
            {uploadError && (
              <div className="mb-6 p-4 rounded-xl border" 
                   style={{ 
                     backgroundColor: `${colors.error}08`, 
                     borderColor: `${colors.error}20` 
                   }}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" style={{ color: colors.error }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: colors.error }}>{uploadError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  Post Title *
                </label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                  style={{ 
                    borderColor: colors.textLight + '30',
                    backgroundColor: colors.light,
                    color: colors.text
                  }}
                  placeholder="Enter a compelling title for your post..."
                  required
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  Author Name
                </label>
                <input
                  type="text"
                  value={postForm.authorName}
                  onChange={(e) => setPostForm({...postForm, authorName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                  style={{ 
                    borderColor: colors.textLight + '30',
                    backgroundColor: colors.light,
                    color: colors.text
                  }}
                  placeholder="Enter author name (optional)"
                />
                <p className="text-xs mt-2" style={{ color: colors.textLight }}>
                  Leave empty to use "Admin" as author
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  Excerpt *
                </label>
                <textarea
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1 resize-none"
                  style={{ 
                    borderColor: colors.textLight + '30',
                    backgroundColor: colors.light,
                    color: colors.text
                  }}
                  placeholder="Write a brief summary of your post..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  Content *
                </label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  rows="12"
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1 resize-none"
                  style={{ 
                    borderColor: colors.textLight + '30',
                    backgroundColor: colors.light,
                    color: colors.text
                  }}
                  placeholder="Write your post content here..."
                  required
                />
              </div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                    Category *
                  </label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                    style={{ 
                      borderColor: colors.textLight + '30',
                      backgroundColor: colors.light,
                      color: colors.text
                    }}
                    required
                  >
                    <option value="Research">Research</option>
                    <option value="Technology">Technology</option>
                    <option value="Environment">Environment</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Science">Science</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                    Tags
                  </label>
                  <input
                    type="text"
                    value={postForm.tags}
                    onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                    style={{ 
                      borderColor: colors.textLight + '30',
                      backgroundColor: colors.light,
                      color: colors.text
                    }}
                    placeholder="AI, Climate, Technology, Innovation..."
                  />
                  <p className="text-xs mt-2" style={{ color: colors.textLight }}>
                    Separate tags with commas
                  </p>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  Featured Image
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold"
                    style={{ 
                      borderColor: colors.textLight + '30',
                      backgroundColor: colors.light,
                      color: colors.text
                    }}
                  />
                  
                  {postForm.imagePreview && (
                    <div className="mt-4 p-4 rounded-xl border" style={{ borderColor: colors.textLight + '30' }}>
                      <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>Image Preview:</p>
                      <div className="flex items-center space-x-4">
                        <img 
                          src={postForm.imagePreview} 
                          alt="Preview" 
                          className="h-24 w-24 object-cover rounded-lg border shadow-sm"
                          style={{ borderColor: colors.textLight + '30' }}
                        />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: colors.textLight }}>
                            {postForm.image?.name}
                          </p>
                          <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                            {(postForm.image?.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs" style={{ color: colors.textLight }}>
                    Supported formats: JPG, PNG, WebP • Max file size: 5MB
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t" style={{ borderColor: colors.textLight + '20' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPostForm(false);
                    setUploadProgress(0);
                    setUploadError('');
                    updateProgress('', 0, '');
                  }}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-200 border"
                  style={{ 
                    borderColor: colors.textLight + '40',
                    color: colors.text,
                    backgroundColor: 'transparent'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  {formLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>
                        {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : 
                         progress.percentage > 0 ? `${progress.message}` : 
                         'Creating Post...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Create Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;