// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* About Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Nature Climate AI</h1>
          
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              Nature Climate Action AI is a pioneering initiative that combines artificial intelligence with environmental science to address the most pressing climate challenges of our time.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Vision</h2>
            <p>
              We envision a world where advanced technology and environmental conservation work hand in hand to create sustainable solutions for our planet. Through the power of AI, we aim to accelerate climate action and promote environmental stewardship.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">What We Do</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Develop AI-powered tools for climate prediction and analysis</li>
              <li>Create educational content about AI and climate technology</li>
              <li>Collaborate with researchers and environmental organizations</li>
              <li>Promote sustainable practices through technology</li>
              <li>Generate AI-based visual content for environmental awareness</li>
              <li>Share inspirational stories about climate action</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Approach</h2>
            <p>
              We believe in a data-driven approach to environmental conservation. By leveraging machine learning algorithms and big data analytics, we can gain deeper insights into climate patterns, predict environmental changes, and develop more effective conservation strategies.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-3">🤖 AI Technology</h3>
                <p className="text-green-700">
                  Utilizing cutting-edge AI algorithms for climate modeling, prediction, and environmental monitoring.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">🌍 Climate Action</h3>
                <p className="text-blue-700">
                  Developing practical solutions and tools to combat climate change and promote sustainability.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">📚 Education</h3>
                <p className="text-yellow-700">
                  Creating educational content and resources to raise awareness about environmental issues.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-3">🎨 AI Art & Visuals</h3>
                <p className="text-purple-700">
                  Generating stunning visual content using AI to promote environmental awareness and conservation.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg mt-8 text-white">
              <h3 className="text-xl font-bold mb-3">🚀 Join Our Mission</h3>
              <p className="mb-4">
                Whether you're a researcher, developer, climate enthusiast, or someone who cares about our planet, there's a place for you in our community. Together, we can harness the power of AI to create a more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/posts" 
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center"
                >
                  Explore Posts
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300 text-center"
                >
                  Get Involved
                </Link>
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