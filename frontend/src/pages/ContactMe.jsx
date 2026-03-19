import React, { useState } from "react";
import { Send, User, MessageSquare, MapPin, Phone, Mail } from "lucide-react";
import { contactAPI } from '../services/api';
import toast from 'react-hot-toast';

const ContactMe = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    message: "" 
  });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await contactAPI.submitContact(formData);
      
      toast.success(response.data.message || 'Message sent successfully!');
      setFormData({ name: "", phone: "", message: "" });
      
    } catch (error) {
      console.error('Contact submission error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Error sending message. Please try again.';
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 overflow-hidden pt-32 pb-40 px-6">
      
      {/* --- PREMIUM DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-[0.5em] mb-4 uppercase">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            Connection Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight italic">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Touch.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-4 font-light">
            I'm currently open to <span className="text-slate-200 font-medium">freelance projects</span> and full-time opportunities. Let's create something that matters.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: SIDER INFO --- */}
          <div className="lg:col-span-4 space-y-4">
            {/* Name Info */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-slate-700 transition-all group">
              <div className="text-cyan-400 mb-4 transform group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Name</h4>
              <p className="text-lg font-semibold text-slate-200 mt-1">Kundan Ram</p>
            </div>

            {/* Phone Info */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-slate-700 transition-all group">
              <div className="text-indigo-400 mb-4 transform group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Response Time</h4>
              <p className="text-lg font-semibold text-slate-200 mt-1">Within 24 Hours</p>
            </div>

            {/* Location Info */}
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] hover:border-slate-700 transition-all group">
              <div className="text-blue-400 mb-4 transform group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Location</h4>
              <p className="text-lg font-semibold text-slate-200 mt-1">Mumbai, India</p>
            </div>
          </div>

          {/* --- RIGHT: THE FORM --- */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="relative group">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-[#0b1120] border border-slate-800 p-8 md:p-14 rounded-[3rem] shadow-2xl space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="group/input relative">
                    <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${focusedField === 'name' ? 'text-cyan-400' : 'text-slate-500'}`}>
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b border-slate-800 py-3 pl-8 focus:outline-none focus:border-cyan-500 transition-all text-slate-200 placeholder:text-slate-800 font-medium"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="group/input relative">
                    <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${focusedField === 'phone' ? 'text-indigo-400' : 'text-slate-500'}`}>
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-slate-800 py-3 pl-8 focus:outline-none focus:border-indigo-500 transition-all text-slate-200 placeholder:text-slate-800 font-medium"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="group/input relative">
                  <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${focusedField === 'message' ? 'text-blue-400' : 'text-slate-500'}`}>
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-0 top-4 text-slate-700" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="I have a project for you..."
                      rows="4"
                      className="w-full bg-transparent border-b border-slate-800 py-3 pl-8 focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-800 font-medium resize-none"
                      required
                      disabled={loading}
                    ></textarea>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative overflow-hidden w-full md:w-auto px-12 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 group/btn hover:bg-cyan-400 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Transmission</span>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Success Message (optional - can be removed if using toast) */}
                <p className="text-xs text-center text-slate-600 mt-4">
                  Your information is safe with us. We'll respond within 24 hours.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Email in bottom right */}
      <div className="absolute bottom-8 right-8 text-slate-800 text-xs font-mono">
        <span className="flex items-center gap-2">
          <Mail size={12} /> hello@kundanram.dev
        </span>
      </div>
    </div>
  );
};

export default ContactMe;