// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { postAPI } from '../services/api';
// import { 
//   Loader2, Upload, X, ArrowLeft, User, Briefcase, 
//   MapPin, Tag, RefreshCw, PenTool, Image as ImageIcon 
// } from 'lucide-react';

// const EditPost = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
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

//   const [existingPhotos, setExistingPhotos] = useState([]);
//   const [newPhotos, setNewPhotos] = useState([]);
//   const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await postAPI.getPostById(id);
//       const post = response.data.data || response.data;
      
//       setFormData({
//         name: post.name || '',
//         credit: post.credit || '',
//         title: post.title || '',
//         description: post.description || '',
//         workingText: post.workingText || '',
//         workPlaceName: post.workPlaceName || '',
//         meetingOutput: post.meetingOutput || '',
//         category: post.category || 'General',
//         tags: post.tags ? post.tags.join(', ') : '',
//       });

//       setExistingPhotos(post.teamPhotos || []);
//     } catch (error) {
//       console.error('Fetch post error:', error);
//       toast.error('Failed to load post');
//       navigate('/admin/posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + existingPhotos.length + newPhotos.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }
//     const validFiles = files.filter(file => {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error(`${file.name} is too large. Max 5MB`);
//         return false;
//       }
//       return true;
//     });
//     setNewPhotos([...newPhotos, ...validFiles]);
//     const newPreviews = validFiles.map(file => URL.createObjectURL(file));
//     setNewPhotoPreviews([...newPhotoPreviews, ...newPreviews]);
//   };

//   const removeExistingPhoto = (index) => {
//     const updated = existingPhotos.filter((_, i) => i !== index);
//     setExistingPhotos(updated);
//   };

//   const removeNewPhoto = (index) => {
//     URL.revokeObjectURL(newPhotoPreviews[index]);
//     setNewPhotos(newPhotos.filter((_, i) => i !== index));
//     setNewPhotoPreviews(newPhotoPreviews.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (existingPhotos.length + newPhotos.length === 0) {
//       toast.error('Please keep at least 1 photo');
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
//       if (existingPhotos.length > 0) {
//         formDataToSend.append('existingPhotos', JSON.stringify(existingPhotos.map(p => p.public_id)));
//       }
//       newPhotos.forEach((photo) => formDataToSend.append('teamPhotos', photo));
//       await postAPI.updatePost(id, formDataToSend);
//       toast.success('Post updated successfully!');
//       navigate('/admin/posts');
//     } catch (error) {
//       console.error('Update error:', error);
//       toast.error(error.response?.data?.message || 'Error updating post');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen bg-white flex items-center justify-center">
//         <Loader2 className="animate-spin text-black" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-black text-white px-4 md:px-8 py-4">
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => navigate('/admin/posts')} 
//               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <div className="h-8 w-[1px] bg-white/30 mx-2 hidden md:block"></div>
//             <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
//           </div>
//           <button 
//             form="edit-form" 
//             disabled={submitting}
//             className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
//           >
//             {submitting ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
//             <span>{submitting ? 'Updating...' : 'Save Changes'}</span>
//           </button>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-12">
//         <form id="edit-form" onSubmit={handleSubmit}>
          
//           {/* Node 1: Identity */}
//           <TreeNode icon={<User size={18}/>} title="Identity" desc="Edit Core Information">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Creator Name *</label>
//                 <input name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all font-medium" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Credit Reference *</label>
//                 <input name="credit" value={formData.credit} onChange={handleChange} required className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all font-medium" />
//               </div>
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Post Title *</label>
//               <input name="title" value={formData.title} onChange={handleChange} required className="w-full border-b border-black py-3 focus:border-slate-400 outline-none transition-all text-2xl font-black" />
//             </div>
//           </TreeNode>

//           {/* Node 2: Content Details */}
//           <TreeNode icon={<PenTool size={18}/>} title="Narrative" desc="Update Story & Outputs">
//             <div className="space-y-6">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description *</label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Working Text *</label>
//                 <textarea name="workingText" value={formData.workingText} onChange={handleChange} rows="4" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Meeting Output *</label>
//                 <textarea name="meetingOutput" value={formData.meetingOutput} onChange={handleChange} rows="4" required className="w-full border border-black p-4 rounded-xl focus:bg-slate-50 outline-none transition-all resize-none" />
//               </div>
//             </div>
//           </TreeNode>

//           {/* Node 3: Metadata */}
//           <TreeNode icon={<Tag size={18}/>} title="Context" desc="Location & Tags">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Work Place *</label>
//                 <div className="flex items-center gap-2 border-b border-black py-2">
//                   <MapPin size={16} />
//                   <input name="workPlaceName" value={formData.workPlaceName} onChange={handleChange} required className="w-full outline-none font-medium" />
//                 </div>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
//                 <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-black py-2 outline-none font-bold bg-white">
//                   <option value="General">General</option>
//                   <option value="Technology">Technology</option>
//                   <option value="Lifestyle">Lifestyle</option>
//                   <option value="Travel">Travel</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-6 space-y-1.5">
//               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tags (comma separated)</label>
//               <input name="tags" value={formData.tags} onChange={handleChange} className="w-full border-b border-black py-2 focus:border-slate-400 outline-none transition-all" />
//             </div>
//           </TreeNode>

//           {/* Node 4: Assets (Images) */}
//           <TreeNode icon={<ImageIcon size={18}/>} title="Media Assets" desc="Manage Team Photos" isLast>
//             {/* Existing Photos Grid */}
//             {existingPhotos.length > 0 && (
//               <div className="mb-8">
//                 <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Current Cloud Assets</p>
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                   {existingPhotos.map((photo, index) => (
//                     <div key={index} className="group relative aspect-square border-2 border-black rounded-lg overflow-hidden">
//                       <img src={photo.url} className="w-full h-full object-cover" alt="" />
//                       <button type="button" onClick={() => removeExistingPhoto(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Upload New Zone */}
//             <div className="relative border-2 border-black border-dashed rounded-2xl p-8 text-center group hover:bg-slate-50 transition-all">
//               <input type="file" accept="image/*" multiple onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
//               <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                 <Upload size={20} />
//               </div>
//               <p className="font-black text-sm uppercase">Add New Photos</p>
//               <p className="text-[10px] text-slate-400 mt-2">Max Total 5 Photos (PNG, JPG)</p>
//             </div>

//             {/* New Previews */}
//             {newPhotoPreviews.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
//                 {newPhotoPreviews.map((src, i) => (
//                   <div key={i} className="group relative aspect-square border-2 border-black rounded-lg overflow-hidden border-dashed">
//                     <img src={src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
//                     <button type="button" onClick={() => removeNewPhoto(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md">
//                       <X size={12} />
//                     </button>
//                     <div className="absolute top-1 left-1 bg-black text-[8px] text-white px-1 font-bold">NEW</div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase">
//               Current Utilization: {existingPhotos.length + newPhotos.length} / 5
//             </p>
//           </TreeNode>

//         </form>
//       </main>
//     </div>
//   );
// };

// // --- Reusable Tree Node Component ---
// const TreeNode = ({ icon, title, desc, children, isLast }) => (
//   <div className="flex gap-4 md:gap-8">
//     <div className="flex flex-col items-center">
//       <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-black bg-white flex items-center justify-center shrink-0 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//         {icon}
//       </div>
//       {!isLast && <div className="w-0.5 h-full bg-black my-2" />}
//     </div>
//     <div className="flex-1 pb-16 pt-1">
//       <div className="mb-6">
//         <h3 className="text-xl font-black uppercase tracking-tight leading-none">{title}</h3>
//         <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">{desc}</p>
//       </div>
//       <div className="bg-white">
//         {children}
//       </div>
//     </div>
//   </div>
// );

// export default EditPost;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postAPI } from '../services/api';
import { 
  Loader2, Upload, X, ArrowLeft, User, Briefcase, 
  MapPin, Tag, RefreshCw, PenTool, Image as ImageIcon 
} from 'lucide-react';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postAPI.getPostById(id);
      const post = response.data.data || response.data;
      
      setFormData({
        name: post.name || '',
        credit: post.credit || '',
        title: post.title || '',
        description: post.description || '',
        workingText: post.workingText || '',
        workPlaceName: post.workPlaceName || '',
        meetingOutput: post.meetingOutput || '',
        category: post.category || 'General',
        tags: post.tags ? post.tags.join(', ') : '',
      });

      setExistingPhotos(post.teamPhotos || []);
    } catch (error) {
      console.error('Fetch post error:', error);
      toast.error('Failed to load post');
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + existingPhotos.length + newPhotos.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB`);
        return false;
      }
      return true;
    });
    setNewPhotos([...newPhotos, ...validFiles]);
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setNewPhotoPreviews([...newPhotoPreviews, ...newPreviews]);
  };

  const removeExistingPhoto = (index) => {
    const updated = existingPhotos.filter((_, i) => i !== index);
    setExistingPhotos(updated);
  };

  const removeNewPhoto = (index) => {
    URL.revokeObjectURL(newPhotoPreviews[index]);
    setNewPhotos(newPhotos.filter((_, i) => i !== index));
    setNewPhotoPreviews(newPhotoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingPhotos.length + newPhotos.length === 0) {
      toast.error('Please keep at least 1 photo');
      return;
    }
    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      if (existingPhotos.length > 0) {
        formDataToSend.append('existingPhotos', JSON.stringify(existingPhotos.map(p => p.public_id)));
      }
      newPhotos.forEach((photo) => formDataToSend.append('teamPhotos', photo));
      await postAPI.updatePost(id, formDataToSend);
      toast.success('Post updated successfully!');
      navigate('/admin/posts');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Error updating post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-red-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-950 text-red-50 font-sans selection:bg-red-500/30 selection:text-white">
      {/* Header - Dark Red Style */}
      <header className="sticky top-0 z-50 bg-red-900/80 backdrop-blur-md text-white px-4 md:px-8 py-4 border-b border-red-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/posts')} 
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="h-8 w-[1px] bg-red-500/30 mx-2 hidden md:block"></div>
            <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
          </div>
          <button 
            form="edit-form" 
            disabled={submitting}
            className="bg-red-500 text-red-950 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-400 transition-all disabled:opacity-50 shadow-lg shadow-red-500/20"
          >
            {submitting ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
            <span>{submitting ? 'Updating...' : 'Save Changes'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <form id="edit-form" onSubmit={handleSubmit}>
          
          {/* Node 1: Identity */}
          <TreeNode icon={<User size={18}/>} title="Identity" desc="Edit Core Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Creator Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all font-medium text-red-50 placeholder:text-red-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Credit Reference *</label>
                <input name="credit" value={formData.credit} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all font-medium text-red-50 placeholder:text-red-900" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Post Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-3 focus:border-red-500 outline-none transition-all text-2xl font-black text-red-50 placeholder:text-red-900" />
            </div>
          </TreeNode>

          {/* Node 2: Content Details */}
          <TreeNode icon={<PenTool size={18}/>} title="Narrative" desc="Update Story & Outputs">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Working Text *</label>
                <textarea name="workingText" value={formData.workingText} onChange={handleChange} rows="4" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Meeting Output *</label>
                <textarea name="meetingOutput" value={formData.meetingOutput} onChange={handleChange} rows="4" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" />
              </div>
            </div>
          </TreeNode>

          {/* Node 3: Metadata */}
          <TreeNode icon={<Tag size={18}/>} title="Context" desc="Location & Tags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Work Place *</label>
                <div className="flex items-center gap-2 border-b border-red-800 py-2">
                  <MapPin size={16} className="text-red-500" />
                  <input name="workPlaceName" value={formData.workPlaceName} onChange={handleChange} required className="w-full bg-transparent outline-none font-medium text-red-50" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-red-800 py-2 outline-none font-bold bg-transparent text-red-50">
                  <option value="General" className="bg-red-900">General</option>
                  <option value="Technology" className="bg-red-900">Technology</option>
                  <option value="Lifestyle" className="bg-red-900">Lifestyle</option>
                  <option value="Travel" className="bg-red-900">Travel</option>
                </select>
              </div>
            </div>
            <div className="mt-6 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Tags (comma separated)</label>
              <input name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all text-red-50" />
            </div>
          </TreeNode>

          {/* Node 4: Assets */}
          <TreeNode icon={<ImageIcon size={18}/>} title="Media Assets" desc="Manage Team Photos" isLast>
            {/* Existing Photos Grid */}
            {existingPhotos.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase text-red-400 mb-4 tracking-widest">Current Cloud Assets</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {existingPhotos.map((photo, index) => (
                    <div key={index} className="group relative aspect-square border border-red-800 rounded-lg overflow-hidden bg-red-900/50">
                      <img src={photo.url} className="w-full h-full object-cover" alt="" />
                      <button type="button" onClick={() => removeExistingPhoto(index)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Zone */}
            <div className="relative border-2 border-red-800 border-dashed rounded-2xl p-8 text-center group hover:bg-red-900/30 transition-all">
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="bg-red-500 text-red-950 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20">
                <Upload size={20} />
              </div>
              <p className="font-black text-sm uppercase text-red-50">Add New Photos</p>
              <p className="text-[10px] text-red-500 mt-2 font-bold">Max Total 5 Photos (PNG, JPG)</p>
            </div>

            {/* New Previews */}
            {newPhotoPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                {newPhotoPreviews.map((src, i) => (
                  <div key={i} className="group relative aspect-square border border-red-800 rounded-lg overflow-hidden border-dashed bg-red-900/50">
                    <img src={src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                    <button type="button" onClick={() => removeNewPhoto(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md">
                      <X size={12} />
                    </button>
                    <div className="absolute top-1 left-1 bg-red-500 text-[8px] text-red-950 px-1 font-bold">NEW</div>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-[10px] font-bold text-red-500 mt-4 uppercase tracking-widest">
              Current Utilization: {existingPhotos.length + newPhotos.length} / 5
            </p>
          </TreeNode>

        </form>
      </main>
    </div>
  );
};

// --- Custom Reusable Tree Node ---
const TreeNode = ({ icon, title, desc, children, isLast }) => (
  <div className="flex gap-4 md:gap-8">
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-red-500 bg-red-950 text-red-500 flex items-center justify-center shrink-0 z-10 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)]">
        {icon}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-red-900 my-2" />}
    </div>
    <div className="flex-1 pb-16 pt-1">
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-tight leading-none text-red-50">{title}</h3>
        <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest">{desc}</p>
      </div>
      <div className="bg-transparent">
        {children}
      </div>
    </div>
  </div>
);

export default EditPost;