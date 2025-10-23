// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  // Premium Color Scheme - Modern & Sophisticated
  const colors = {
    primary: '#3B82F6',      // Premium Blue
    secondary: '#1E40AF',    // Deep Blue
    accent: '#F59E0B',       // Gold Accent
    dark: '#111827',         // Charcoal
    light: '#F9FAFB',        // Premium White
    text: '#374151',         // Graphite
    textLight: '#6B7280',    // Silver
    success: '#10B981',      // Emerald
    warning: '#F59E0B',      // Amber
    error: '#EF4444'         // Ruby
  };

  // Enhanced Social Media Links with Better Icons
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: (
        <div className="relative group">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Visit GitHub
          </div>
        </div>
      ),
      color: 'from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/yourchannel',
      icon: (
        <div className="relative group">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Watch Videos
          </div>
        </div>
      ),
      color: 'from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: (
        <div className="relative group">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Follow Instagram
          </div>
        </div>
      ),
      color: 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/yournumber',
      icon: (
        <div className="relative group">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.534"/>
          </svg>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Message on WhatsApp
          </div>
        </div>
      ),
      color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    }
  ];

  // Enhanced Icons for Sections
  const sectionIcons = {
    about: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-6"></div>
        <div className="relative bg-white rounded-2xl p-3 transform -rotate-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    ),
    passions: '✨',
    skills: '🚀',
    digital: '💻',
    nature: '🌱',
    philosophy: '🌟',
    funfacts: '🎯'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Premium Header Section - Responsive */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-12 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 55%),
                            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 55%)`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Premium Profile Image - Responsive */}
          <div className="w-24 h-24 md:w-40 md:h-40 mx-auto mb-6 md:mb-8 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden ring-4 ring-white/20 transform hover:scale-105 transition-transform duration-500">
            <img 
              src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png" 
              alt="Ram Kumar - Web Developer"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Responsive Typography */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
            RAM KUMAR
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
            Farmer by Heart • Problem Solver by Nature • Developer by Passion
          </p>
          
          {/* Premium Social Media Links - Responsive */}
          <div className="flex justify-center space-x-4 md:space-x-6 flex-wrap gap-4 md:gap-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:rotate-3 transform`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Premium About Content - Fully Responsive */}
      <div className="container mx-auto px-4 py-8 md:py-16 -mt-8 md:-mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-16 max-w-7xl mx-auto border border-white/20">
          {/* Premium Personal Introduction - Responsive */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-6 transform hover:rotate-6 transition-transform duration-500">
              {sectionIcons.about}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 text-gray-700 px-4">
              Hello! I'm <strong className="text-blue-600 font-semibold">Ram</strong> - a unique fusion of traditional farming wisdom and cutting-edge technology expertise. 
              I thrive on planting trees, solving complex challenges, and crafting digital solutions that create meaningful impact in people's lives.
            </p>
            
            {/* Premium Quick Stats - Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { number: '50+', label: 'Trees Planted', icon: '🌳' },
                { number: '20+', label: 'Projects', icon: '🚀' },
                { number: '3+', label: 'Months Coding', icon: '💻' },
                { number: '100%', label: 'Passionate', icon: '❤️' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2">
                  <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Passions & Interests - Responsive */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Passions & Interests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: '🌱',
                  title: 'Farming & Agriculture',
                  desc: 'Growing plants, tree plantation, and sustainable farming practices',
                  color: 'from-emerald-500 to-green-600',
                  bgColor: 'from-emerald-50 to-green-50'
                },
                {
                  icon: '💻',
                  title: 'Coding & Development',
                  desc: 'Web development, problem-solving, and creating innovative solutions',
                  color: 'from-blue-500 to-blue-600',
                  bgColor: 'from-blue-50 to-indigo-50'
                },
                {
                  icon: '🎬',
                  title: 'Movies & Web Series',
                  desc: 'Love watching movies, web series and exploring different storytelling',
                  color: 'from-purple-500 to-purple-600',
                  bgColor: 'from-purple-50 to-violet-50'
                },
                {
                  icon: '📱',
                  title: 'Social Media',
                  desc: 'Active on Instagram, WhatsApp, and managing YouTube channel',
                  color: 'from-pink-500 to-rose-600',
                  bgColor: 'from-pink-50 to-rose-50'
                },
                {
                  icon: '🌍',
                  title: 'Travel & Exploration',
                  desc: 'Exploring new places, cultures, and natural beauty',
                  color: 'from-orange-500 to-amber-600',
                  bgColor: 'from-orange-50 to-amber-50'
                },
                {
                  icon: '🔧',
                  title: 'Problem Solving',
                  desc: 'Finding creative solutions to challenges in tech and life',
                  color: 'from-red-500 to-red-600',
                  bgColor: 'from-red-50 to-pink-50'
                }
              ].map((item, index) => (
                <div key={index} className={`group bg-gradient-to-br ${item.bgColor} rounded-2xl p-6 md:p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 backdrop-blur-sm`}>
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Skills & Digital Presence - Responsive */}
          <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-3xl p-6 md:p-12 mb-12 md:mb-20 backdrop-blur-sm border border-blue-200/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Skills & Digital Presence
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { number: 'Web Dev', label: 'Frontend & Backend', icon: '💻', color: 'from-blue-500 to-blue-600' },
                { number: 'UI/UX', label: 'Design Thinking', icon: '🎨', color: 'from-purple-500 to-purple-600' },
                { number: 'GitHub', label: 'Open Source', icon: '📁', color: 'from-gray-700 to-gray-900' },
                { number: 'YouTube', label: 'Content Creation', icon: '🎥', color: 'from-red-500 to-red-600' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white text-3xl md:text-4xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Daily Life Section - Responsive */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Digital & Natural World
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Digital Life */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-3xl p-6 md:p-10 border border-blue-200/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mr-4 md:mr-6 shadow-lg">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Digital Life</h3>
                </div>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700">
                  {[
                    'Web Development & Coding Projects',
                    'Active on Instagram & Social Media',
                    'YouTube Channel Management',
                    'Problem Solving with Technology',
                    'Learning New Tech Skills Daily'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center group">
                      <span className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full mr-3 md:mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Natural Life */}
              <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/80 rounded-3xl p-6 md:p-10 border border-emerald-200/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white mr-4 md:mr-6 shadow-lg">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Natural Life</h3>
                </div>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700">
                  {[
                    'Farming & Agricultural Activities',
                    'Tree Plantation & Gardening',
                    'Environmental Conservation',
                    'Travel & Nature Exploration',
                    'Sustainable Living Practices'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center group">
                      <span className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full mr-3 md:mr-4 group-hover:scale-150 transition-transform duration-300"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Call to Action - Responsive */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl mb-12 md:mb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
            
            <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 relative z-10">Let's Connect & Grow Together! 🌟</h3>
            <p className="text-blue-100 text-lg mb-6 md:mb-10 max-w-3xl mx-auto relative z-10 leading-relaxed px-4">
              Whether you want to discuss farming, technology, movies, or just have a meaningful conversation - I'm always excited to connect with passionate, like-minded individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-10">
              <Link 
                to="/posts" 
                className="bg-white text-blue-600 px-6 md:px-12 py-3 md:py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl text-base md:text-lg hover:scale-105 transform w-full sm:w-auto text-center"
              >
                View My Work
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-6 md:px-12 py-3 md:py-5 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-base md:text-lg hover:scale-105 transform w-full sm:w-auto text-center"
              >
                Get In Touch
              </Link>
            </div>
            
            {/* Premium Social Links - Responsive */}
            <div className="mt-8 md:mt-12 relative z-10">
              <p className="text-blue-200 mb-4 md:mb-6 text-base md:text-lg">Find me on social media:</p>
              <div className="flex justify-center space-x-4 md:space-x-8 flex-wrap gap-4 md:gap-0">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl transform`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Personal Philosophy - Responsive */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              My Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: '🌳',
                  title: 'Grow & Nurture',
                  desc: 'Just like plants, knowledge and relationships need constant nurturing and care to flourish',
                  color: 'from-emerald-500 to-green-600'
                },
                {
                  icon: '💡',
                  title: 'Solve & Innovate',
                  desc: 'Every problem is an opportunity to create something better and make a positive impact',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: '🤝',
                  title: 'Connect & Share',
                  desc: 'True growth happens when we share knowledge, experiences, and support each other',
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 md:p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3">
                  <div className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl mx-auto mb-6 shadow-2xl hover:rotate-12 transition-transform duration-500`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Fun Facts - Responsive */}
          <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 rounded-3xl p-8 md:p-16 border border-amber-200/50 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Fun Facts About Me
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center text-gray-800">
                  <span className="text-3xl md:text-4xl mr-3 md:mr-4">🎬</span>
                  Entertainment Love
                </h4>
                <ul className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-700">
                  {[
                    'Movie enthusiast - from Bollywood to Hollywood and everything in between',
                    'Web series binge-watcher with a keen eye for storytelling',
                    'Love analyzing storylines, characters, and cinematic techniques'
                  ].map((fact, idx) => (
                    <li key={idx} className="flex items-start group">
                      <span className="text-amber-500 text-xl md:text-2xl mr-3 md:mr-4 group-hover:scale-125 transition-transform duration-300">•</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center text-gray-800">
                  <span className="text-3xl md:text-4xl mr-3 md:mr-4">🌐</span>
                  Digital Activities
                </h4>
                <ul className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-700">
                  {[
                    'Active Instagram user sharing life moments and insights',
                    'YouTube content creator focused on tech and lifestyle',
                    'GitHub project contributor and open-source enthusiast',
                    'Active participant in tech communities and discussions'
                  ].map((fact, idx) => (
                    <li key={idx} className="flex items-start group">
                      <span className="text-amber-500 text-xl md:text-2xl mr-3 md:mr-4 group-hover:scale-125 transition-transform duration-300">•</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;