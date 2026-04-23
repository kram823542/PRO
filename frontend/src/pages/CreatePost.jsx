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
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    <div className="min-h-screen bg-red-950 text-red-50 font-sans selection:bg-red-500/30 selection:text-white">
      {/* Header - Red Theme */}
      <header className="sticky top-0 z-50 bg-red-900/80 backdrop-blur-md text-white px-4 md:px-8 py-4 border-b border-red-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg text-red-950"><PenTool size={20} /></div>
            <h1 className="text-xl font-bold tracking-tight">Studio Editor</h1>
          </div>
          <button 
            form="main-form" 
            disabled={loading}
            className="bg-red-500 text-red-950 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-400 transition-all disabled:opacity-50 shadow-lg shadow-red-500/20"
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Creator Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all font-medium text-red-50 placeholder:text-red-900" placeholder="Full Name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Credit Reference *</label>
                <input name="credit" value={formData.credit} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all font-medium text-red-50 placeholder:text-red-900" placeholder="@handle" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Post Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-transparent border-b border-red-800 py-3 focus:border-red-500 outline-none transition-all text-2xl font-black text-red-50 placeholder:text-red-900" placeholder="Headline here..." />
            </div>
          </TreeNode>

          {/* Node 2: Content Details */}
          <TreeNode icon={<Briefcase size={18}/>} title="Narrative" desc="Story & Workflow">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" placeholder="Detailed story..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Working Text *</label>
                <textarea name="workingText" value={formData.workingText} onChange={handleChange} rows="3" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" placeholder="Execution process..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-red-400">Meeting Output *</label>
                <textarea name="meetingOutput" value={formData.meetingOutput} onChange={handleChange} rows="3" required className="w-full bg-red-900/30 border border-red-800 p-4 rounded-xl focus:bg-red-900/50 focus:border-red-500 outline-none transition-all resize-none text-red-50" placeholder="Key takeaways..." />
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
                  <input name="workPlaceName" value={formData.workPlaceName} onChange={handleChange} required className="w-full bg-transparent outline-none font-medium text-red-50 placeholder:text-red-900" placeholder="Location name" />
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
              <input name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-transparent border-b border-red-800 py-2 focus:border-red-500 outline-none transition-all text-red-50 placeholder:text-red-900" placeholder="react, design, studio" />
            </div>
          </TreeNode>

          {/* Node 4: Assets */}
          <TreeNode icon={<ImageIcon size={18}/>} title="Assets" desc="Media upload" isLast>
            <div className="relative border-2 border-red-800 border-dashed rounded-2xl p-8 text-center group hover:bg-red-900/30 transition-all">
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="bg-red-500 text-red-950 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20">
                <Upload size={20} />
              </div>
              <p className="font-black text-sm uppercase text-red-50">Add Team Photos</p>
              <p className="text-[10px] text-red-500 mt-2 font-bold">Max 5 Images (Auto-Compressed)</p>
            </div>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
                {photoPreviews.map((src, i) => (
                  <div key={i} className="group relative aspect-square border border-red-800 rounded-lg overflow-hidden bg-red-900/50">
                    <img src={src} className="w-full h-full object-cover" alt="" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-red-950/80 text-red-200 text-[8px] py-1 text-center font-bold">
                      {(teamPhotos[i]?.size / 1024 / 1024).toFixed(1)}MB
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sync Status - Updated to Red Theme */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-8 space-y-3 bg-red-900/40 text-red-50 p-6 rounded-2xl border border-red-800">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-red-400"><Layers size={14} /> System Syncing</h4>
                {teamPhotos.map((_, idx) => {
                  const p = uploadProgress[idx];
                  if(!p) return null;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-red-300">CHUNK_{idx+1}</span>
                        <span className="text-red-300">{p.status === 'completed' ? 'DONE' : p.status === 'error' ? 'FAIL' : `${p.progress}%`}</span>
                      </div>
                      <div className="h-[2px] w-full bg-red-950">
                        <div className={`h-full transition-all duration-300 ${p.status === 'error' ? 'bg-red-500' : 'bg-red-400'}`} style={{ width: `${p.progress}%` }} />
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

// --- Custom Tree Node Component (Updated Colors) ---
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

export default CreatePost;