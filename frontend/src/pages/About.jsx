// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  // Professional Color Scheme
  const colors = {
    primary: '#2563eb',      // Professional Blue
    secondary: '#1e40af',    // Dark Blue
    accent: '#f59e0b',       // Amber
    dark: '#0f172a',         // Dark Slate
    light: '#f8fafc',        // Light Background
    text: '#1e293b',         // Text Color
    textLight: '#64748b',    // Light Text
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444'         // Red
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Nature Climate AI</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Pioneering AI-driven solutions for environmental conservation and climate action
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          {/* Mission Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.dark }}>Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: colors.text }}>
              To leverage artificial intelligence for creating sustainable environmental solutions and accelerating global climate action through innovation, education, and collaboration.
            </p>
          </div>

          {/* What We Do */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark }}>What We Do</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🤖',
                  title: 'AI Climate Modeling',
                  desc: 'Advanced predictive models for climate pattern analysis',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: '🌍',
                  title: 'Environmental Monitoring',
                  desc: 'Real-time tracking of environmental changes and threats',
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: '📊',
                  title: 'Data Analytics',
                  desc: 'Big data analysis for informed conservation decisions',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: '🎓',
                  title: 'Education & Awareness',
                  desc: 'AI-powered educational content and resources',
                  color: 'from-orange-500 to-orange-600'
                },
                {
                  icon: '🤝',
                  title: 'Global Collaboration',
                  desc: 'Partnering with researchers and organizations worldwide',
                  color: 'from-red-500 to-red-600'
                },
                {
                  icon: '💡',
                  title: 'Innovation Hub',
                  desc: 'Developing cutting-edge climate tech solutions',
                  color: 'from-indigo-500 to-indigo-600'
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textLight }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: '50+', label: 'AI Models' },
                { number: '1000+', label: 'Climate Projects' },
                { number: '25+', label: 'Countries' },
                { number: '24/7', label: 'Monitoring' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{stat.number}</div>
                  <div className="text-sm font-medium" style={{ color: colors.textLight }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Join the Climate AI Revolution</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of the movement that's transforming climate action through artificial intelligence and innovative technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/posts" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Work
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Get Involved
              </Link>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark }}>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Innovation',
                  desc: 'Pushing boundaries with cutting-edge AI technology'
                },
                {
                  icon: '🌱',
                  title: 'Sustainability',
                  desc: 'Creating solutions that benefit both people and planet'
                },
                {
                  icon: '🔍',
                  title: 'Transparency',
                  desc: 'Open and honest about our methods and results'
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>{value.title}</h3>
                  <p className="text-sm" style={{ color: colors.textLight }}>{value.desc}</p>
                </div>
              ))}
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