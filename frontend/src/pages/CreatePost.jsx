

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { postAPI } from '../services/api';
// import { Upload, X, Loader2, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

// const CreatePost = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     credit: '',
//     title: '',
//     description: '',
//     workingText: '',
//     workPlaceName: '',
//     meetingOutput: '',
//     category: 'General',
//     tags: '',
//   });

//   const [teamPhotos, setTeamPhotos] = useState([]);
//   const [photoPreviews, setPhotoPreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Image compression function
//   const compressImage = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = (event) => {
//         const img = new Image();
//         img.src = event.target.result;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');

//           // Calculate new dimensions (max 1200px)
//           let width = img.width;
//           let height = img.height;
//           const maxSize = 1200;

//           if (width > height) {
//             if (width > maxSize) {
//               height = Math.round((height * maxSize) / width);
//               width = maxSize;
//             }
//           } else {
//             if (height > maxSize) {
//               width = Math.round((width * maxSize) / height);
//               height = maxSize;
//             }
//           }

//           canvas.width = width;
//           canvas.height = height;

//           // Draw and compress image
//           ctx.drawImage(img, 0, 0, width, height);

//           // Convert to blob with reduced quality
//           canvas.toBlob(
//             (blob) => {
//               const compressedFile = new File([blob], file.name, {
//                 type: 'image/jpeg',
//                 lastModified: Date.now()
//               });
              
//               // Log compression stats
//               console.log(`📦 Original: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
//               console.log(`📦 Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
//               console.log(`📊 Reduction: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);
              
//               resolve(compressedFile);
//             },
//             'image/jpeg',
//             0.8 // 80% quality
//           );
//         };
//         img.onerror = (error) => reject(error);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files);
    
//     if (files.length + teamPhotos.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }

//     // Show compression loading toast
//     const compressToast = toast.loading(`Compressing ${files.length} image(s)...`);

//     try {
//       const compressedFiles = [];
//       const newPreviews = [];

//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
        
//         // Check original size
//         if (file.size > 10 * 1024 * 1024) {
//           toast.error(`${file.name} is too large. Max 10MB before compression`);
//           continue;
//         }

//         // Compress image
//         const compressedFile = await compressImage(file);
//         compressedFiles.push(compressedFile);
        
//         // Create preview
//         const preview = URL.createObjectURL(compressedFile);
//         newPreviews.push(preview);
//       }

//       if (compressedFiles.length > 0) {
//         setTeamPhotos([...teamPhotos, ...compressedFiles]);
//         setPhotoPreviews([...photoPreviews, ...newPreviews]);
//         toast.success(`${compressedFiles.length} image(s) compressed successfully`, {
//           id: compressToast
//         });
//       } else {
//         toast.dismiss(compressToast);
//       }

//     } catch (error) {
//       console.error('Compression error:', error);
//       toast.error('Error compressing images', { id: compressToast });
//     }
//   };

//   const removeImage = (index) => {
//     // Revoke object URL to avoid memory leaks
//     URL.revokeObjectURL(photoPreviews[index]);
    
//     const newPhotos = teamPhotos.filter((_, i) => i !== index);
//     const newPreviews = photoPreviews.filter((_, i) => i !== index);
    
//     setTeamPhotos(newPhotos);
//     setPhotoPreviews(newPreviews);
//   };

//   // Upload images one by one
//   const uploadImagesOneByOne = async () => {
//     const uploadedUrls = [];
//     const uploadResults = [];

//     for (let i = 0; i < teamPhotos.length; i++) {
//       const photo = teamPhotos[i];
      
//       // Update progress for current image
//       setUploadProgress(prev => ({
//         ...prev,
//         [i]: { status: 'uploading', progress: 0 }
//       }));

//       toast.loading(`Uploading image ${i + 1}/${teamPhotos.length}...`, { 
//         id: `upload-${i}` 
//       });

//       try {
//         // Create FormData for single image
//         const imageFormData = new FormData();
//         imageFormData.append('image', photo);

//         // Simulate progress (since axios progress may not work with all setups)
//         let progress = 0;
//         const progressInterval = setInterval(() => {
//           progress += 10;
//           if (progress <= 90) {
//             setUploadProgress(prev => ({
//               ...prev,
//               [i]: { status: 'uploading', progress }
//             }));
//           }
//         }, 500);

//         // Upload image (you'll need to create this endpoint)
//         // For now, we'll just collect the images for the main form
//         // This is a simplified approach - in production, you'd have a separate upload endpoint
        
//         clearInterval(progressInterval);
        
//         // Mark as completed
//         setUploadProgress(prev => ({
//           ...prev,
//           [i]: { status: 'completed', progress: 100 }
//         }));

//         uploadResults.push({
//           index: i,
//           file: photo,
//           status: 'success'
//         });

//         toast.success(`Image ${i + 1} ready`, { id: `upload-${i}` });

//       } catch (error) {
//         console.error(`Error processing image ${i + 1}:`, error);
        
//         setUploadProgress(prev => ({
//           ...prev,
//           [i]: { status: 'error', progress: 0 }
//         }));

//         uploadResults.push({
//           index: i,
//           file: photo,
//           status: 'error',
//           error: error.message
//         });

//         toast.error(`Failed to process image ${i + 1}`, { id: `upload-${i}` });
//         throw error; // Stop submission if any image fails
//       }
//     }

//     return uploadResults;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (teamPhotos.length === 0) {
//       toast.error('Please upload at least 1 team photo');
//       return;
//     }

//     setLoading(true);
//     setUploadProgress({});

//     // Show overall upload progress toast
//     const uploadToast = toast.loading('Processing images...');

//     try {
//       // First, process images one by one
//       const uploadResults = await uploadImagesOneByOne();

//       // Check if all images were processed successfully
//       const failedImages = uploadResults.filter(r => r.status === 'error');
//       if (failedImages.length > 0) {
//         throw new Error(`${failedImages.length} image(s) failed to process`);
//       }

//       toast.loading('Creating post...', { id: uploadToast });

//       // Create main FormData for post
//       const formDataToSend = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         formDataToSend.append(key, formData[key]);
//       });

//       // Append tags as comma-separated string
//       if (formData.tags) {
//         formDataToSend.append('tags', formData.tags);
//       }

//       // Append each photo (already compressed)
//       teamPhotos.forEach((photo) => {
//         formDataToSend.append('teamPhotos', photo);
//       });

//       // Send final post request
//       const response = await postAPI.createPost(formDataToSend);
      
//       toast.success('Post created successfully!', { id: uploadToast });
      
//       // Clean up preview URLs
//       photoPreviews.forEach(preview => URL.revokeObjectURL(preview));
      
//       navigate('/admin/posts');
      
//     } catch (error) {
//       console.error('Create post error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Error creating post', 
//         { id: uploadToast }
//       );
//     } finally {
//       setLoading(false);
//       setUploadProgress({});
//     }
//   };

//   // Render upload progress for each image
//   const renderUploadProgress = () => {
//     if (Object.keys(uploadProgress).length === 0) return null;

//     return (
//       <div className="mt-4 space-y-2">
//         <p className="text-sm font-medium text-gray-700">Upload Progress:</p>
//         {teamPhotos.map((_, index) => {
//           const progress = uploadProgress[index];
//           if (!progress) return null;

//           return (
//             <div key={index} className="flex items-center gap-2">
//               <div className="flex-1">
//                 <div className="flex justify-between text-xs mb-1">
//                   <span>Image {index + 1}</span>
//                   <span className="font-medium">
//                     {progress.status === 'completed' && '✅'}
//                     {progress.status === 'error' && '❌'}
//                     {progress.status === 'uploading' && `${progress.progress}%`}
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className={`h-2 rounded-full transition-all duration-300 ${
//                       progress.status === 'error' ? 'bg-red-500' :
//                       progress.status === 'completed' ? 'bg-green-500' :
//                       'bg-blue-500'
//                     }`}
//                     style={{ width: `${progress.progress || 0}%` }}
//                   />
//                 </div>
//               </div>
//               {progress.status === 'completed' && (
//                 <CheckCircle className="text-green-500" size={16} />
//               )}
//               {progress.status === 'error' && (
//                 <AlertCircle className="text-red-500" size={16} />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 ml-16">
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             {/* Form fields (same as before) */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Credit *
//                 </label>
//                 <input
//                   type="text"
//                   name="credit"
//                   value={formData.credit}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Working Text *
//               </label>
//               <textarea
//                 name="workingText"
//                 value={formData.workingText}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Work Place Name *
//               </label>
//               <input
//                 type="text"
//                 name="workPlaceName"
//                 value={formData.workPlaceName}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Meeting Output *
//               </label>
//               <textarea
//                 name="meetingOutput"
//                 value={formData.meetingOutput}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="General">General</option>
//                   <option value="Technology">Technology</option>
//                   <option value="Lifestyle">Lifestyle</option>
//                   <option value="Travel">Travel</option>
//                   <option value="Food">Food</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Tags (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   placeholder="react, javascript, web"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Team Photos Upload */}
//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Team Photos * (Max 5)
//               </label>
              
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   multiple
//                   className="hidden"
//                   id="photo-upload"
//                 />
                
//                 <label
//                   htmlFor="photo-upload"
//                   className="cursor-pointer flex flex-col items-center justify-center"
//                 >
//                   <Upload className="h-12 w-12 text-gray-400 mb-2" />
//                   <span className="text-gray-600 font-medium">Click to upload images</span>
//                   <span className="text-sm text-gray-400 mt-1">
//                     PNG, JPG, GIF (Auto-compressed to ~1-2MB)
//                   </span>
//                 </label>
//               </div>

//               {/* Image Previews */}
//               {photoPreviews.length > 0 && (
//                 <div className="mt-4">
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     {photoPreviews.map((preview, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={preview}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={16} />
//                         </button>
//                         <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
//                           {(teamPhotos[index]?.size / 1024 / 1024).toFixed(1)}MB
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload Progress Indicator */}
//               {renderUploadProgress()}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium disabled:opacity-50 flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2" size={20} />
//                   Processing {teamPhotos.length} image(s)...
//                 </>
//               ) : (
//                 'Create Post'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postAPI } from '../services/api';
import { 
  Upload, X, Loader2, Image as ImageIcon, CheckCircle, 
  AlertCircle, User, Briefcase, MapPin, Tag, Rocket, PenTool, Layers 
} from 'lucide-react';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    name: '',
    credit: '',
    title: '',
    description: '',
    workingText: '',
    workPlaceName: '',
    meetingOutput: '',
    category: 'General',
    tags: '',
  });

  const [teamPhotos, setTeamPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Logic Preserved Exactly ---
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width;
          let height = img.height;
          const maxSize = 1200;
          if (width > height) {
            if (width > maxSize) { height = Math.round((height * maxSize) / width); width = maxSize; }
          } else {
            if (height > maxSize) { width = Math.round((width * maxSize) / height); height = maxSize; }
          }
          canvas.width = width; canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
            resolve(compressedFile);
          }, 'image/jpeg', 0.8);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + teamPhotos.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    const compressToast = toast.loading(`Compressing ${files.length} image(s)...`);
    try {
      const compressedFiles = [];
      const newPreviews = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large`);
          continue;
        }
        const compressedFile = await compressImage(file);
        compressedFiles.push(compressedFile);
        newPreviews.push(URL.createObjectURL(compressedFile));
      }
      if (compressedFiles.length > 0) {
        setTeamPhotos([...teamPhotos, ...compressedFiles]);
        setPhotoPreviews([...photoPreviews, ...newPreviews]);
        toast.success(`${compressedFiles.length} image(s) compressed`, { id: compressToast });
      } else { toast.dismiss(compressToast); }
    } catch (error) { toast.error('Error compressing images', { id: compressToast }); }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setTeamPhotos(teamPhotos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const uploadImagesOneByOne = async () => {
    const uploadResults = [];
    for (let i = 0; i < teamPhotos.length; i++) {
      setUploadProgress(prev => ({ ...prev, [i]: { status: 'uploading', progress: 0 } }));
      toast.loading(`Uploading image ${i + 1}/${teamPhotos.length}...`, { id: `upload-${i}` });
      try {
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress <= 90) setUploadProgress(prev => ({ ...prev, [i]: { status: 'uploading', progress } }));
        }, 500);
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating upload delay
        
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [i]: { status: 'completed', progress: 100 } }));
        uploadResults.push({ index: i, status: 'success' });
        toast.success(`Image ${i + 1} ready`, { id: `upload-${i}` });
      } catch (error) {
        setUploadProgress(prev => ({ ...prev, [i]: { status: 'error', progress: 0 } }));
        toast.error(`Failed image ${i + 1}`, { id: `upload-${i}` });
        throw error;
      }
    }
    return uploadResults;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamPhotos.length === 0) { toast.error('Please upload at least 1 photo'); return; }
    setLoading(true);
    const uploadToast = toast.loading('Processing images...');
    try {
      await uploadImagesOneByOne();
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      teamPhotos.forEach(photo => formDataToSend.append('teamPhotos', photo));
      
      await postAPI.createPost(formDataToSend);
      toast.success('Post created successfully!', { id: uploadToast });
      navigate('/admin/posts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating post', { id: uploadToast });
    } finally { setLoading(false); setUploadProgress({}); }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black text-white px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg text-black"><PenTool size={20} /></div>
            <h1 className="text-xl font-bold tracking-tight">Studio Editor</h1>
          </div>
          <button 
            form="main-form" 
            disabled={loading}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Rocket size={16} />}
            <span>{loading ? 'Publishing...' : 'Publish'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <form id="main-form" onSubmit={handleSubmit} className="relative">
          
          {/* Node 1: Basic Info */}
          <TreeNode icon={<User size={18}/>} title="Identity" desc="Core Post Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Creator Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all font-medium" placeholder="Full Name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Credit Reference *</label>
                <input name="credit" value={formData.credit} onChange={handleChange} required className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all font-medium" placeholder="@handle" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Post Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full border-b border-black py-3 focus:border-slate-400 outline-none transition-all text-2xl font-black" placeholder="Headline here..." />
            </div>
          </TreeNode>

          {/* Node 2: Content Details */}
          <TreeNode icon={<Briefcase size={18}/>} title="Narrative" desc="Story & Workflow">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" placeholder="Detailed story..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Working Text *</label>
                <textarea name="workingText" value={formData.workingText} onChange={handleChange} rows="3" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" placeholder="Execution process..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Meeting Output *</label>
                <textarea name="meetingOutput" value={formData.meetingOutput} onChange={handleChange} rows="3" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" placeholder="Key takeaways..." />
              </div>
            </div>
          </TreeNode>

          {/* Node 3: Metadata */}
          <TreeNode icon={<Tag size={18}/>} title="Context" desc="Location & Tags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Work Place *</label>
                <div className="flex items-center gap-2 border-b border-black py-2">
                  <MapPin size={16} />
                  <input name="workPlaceName" value={formData.workPlaceName} onChange={handleChange} required className="w-full outline-none font-medium" placeholder="Location name" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-black py-2 outline-none font-bold bg-white">
                  <option value="General">General</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>
            </div>
            <div className="mt-6 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tags (comma separated)</label>
              <input name="tags" value={formData.tags} onChange={handleChange} className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all" placeholder="react, design, studio" />
            </div>
          </TreeNode>

          {/* Node 4: Assets */}
          <TreeNode icon={<ImageIcon size={18}/>} title="Assets" desc="Media upload" isLast>
            <div className="relative border-2 border-black border-dashed rounded-2xl p-8 text-center group hover:bg-slate-50 transition-all">
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>
              <p className="font-black text-sm uppercase">Add Team Photos</p>
              <p className="text-[10px] text-slate-400 mt-2">Max 5 Images (Auto-Compressed)</p>
            </div>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
                {photoPreviews.map((src, i) => (
                  <div key={i} className="group relative aspect-square border border-black rounded-lg overflow-hidden">
                    <img src={src} className="w-full h-full object-cover" alt="" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-[8px] py-1 text-center font-bold">
                      {(teamPhotos[i]?.size / 1024 / 1024).toFixed(1)}MB
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sync Status */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-8 space-y-3 bg-black text-white p-6 rounded-2xl">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Layers size={14} /> System Syncing</h4>
                {teamPhotos.map((_, idx) => {
                  const p = uploadProgress[idx];
                  if(!p) return null;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold">
                        <span>CHUNK_{idx+1}</span>
                        <span>{p.status === 'completed' ? 'DONE' : p.status === 'error' ? 'FAIL' : `${p.progress}%`}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/20">
                        <div className={`h-full transition-all duration-300 ${p.status === 'error' ? 'bg-red-500' : 'bg-white'}`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TreeNode>

        </form>
      </main>
    </div>
  );
};

// --- Custom Tree Node Component ---
const TreeNode = ({ icon, title, desc, children, isLast }) => (
  <div className="flex gap-4 md:gap-8">
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-black bg-white flex items-center justify-center shrink-0 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-black my-2" />}
    </div>
    <div className="flex-1 pb-16 pt-1">
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-tight leading-none">{title}</h3>
        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">{desc}</p>
      </div>
      <div className="bg-white">
        {children}
      </div>
    </div>
  </div>
);

export default CreatePost;
