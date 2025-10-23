// src/pages/Contact.jsx
import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Connect With Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let's collaborate to create sustainable solutions for our planet. Whether you're interested in 
              climate tech, AI innovations, or environmental partnerships, we're here to make a difference together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600">kundanram7261@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-50 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">+91 8235420468</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-50 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">Our Location</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Based in India<br />
                        Working globally to create<br />
                        sustainable impact
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-50 p-3 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">Response Time</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We typically respond<br />
                        within 24 hours<br />
                        Your ideas matter to us
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Connect Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-semibold text-gray-800 text-xl mb-6">Why Connect With Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-600">Innovative solutions for climate challenges</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-600">Expertise in AI and sustainable technology</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-600">Passionate team committed to environmental impact</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-600">Collaborative approach to problem-solving</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions and Privacy Policy */}
            <div className="space-y-8">
              {/* Terms & Conditions */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p><strong className="text-gray-800">1. Acceptance of Terms</strong><br />
                  By contacting us, you agree to these terms and conditions.</p>
                  
                  <p><strong className="text-gray-800">2. Communication</strong><br />
                  We strive to respond to all inquiries within 24 hours during business days.</p>
                  
                  <p><strong className="text-gray-800">3. Privacy</strong><br />
                  Your contact information will be used solely for communication purposes and will not be shared with third parties.</p>
                  
                  <p><strong className="text-gray-800">4. Intellectual Property</strong><br />
                  All discussions and shared ideas remain confidential and respect intellectual property rights.</p>
                  
                  <p><strong className="text-gray-800">5. Service Availability</strong><br />
                  Our services are subject to availability and may vary based on project requirements.</p>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p><strong className="text-gray-800">1. Information Collection</strong><br />
                  We collect only the necessary contact information you provide to us directly.</p>
                  
                  <p><strong className="text-gray-800">2. Use of Information</strong><br />
                  Your information is used solely for communication and collaboration purposes.</p>
                  
                  <p><strong className="text-gray-800">3. Data Protection</strong><br />
                  We implement security measures to protect your personal information.</p>
                  
                  <p><strong className="text-gray-800">4. Information Sharing</strong><br />
                  We do not sell, trade, or rent your personal information to third parties.</p>
                  
                  <p><strong className="text-gray-800">5. Your Rights</strong><br />
                  You have the right to request access to or deletion of your personal information.</p>
                  
                  <p><strong className="text-gray-800">6. Policy Updates</strong><br />
                  We may update this privacy policy periodically. Continued contact implies acceptance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Opportunities */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Opportunities for Collaboration</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Let's join hands to build a sustainable future through technology and innovation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌱',
                  title: 'Green Tech Projects',
                  description: 'Develop innovative solutions that combine technology with environmental conservation for real-world impact.'
                },
                {
                  icon: '🤝',
                  title: 'Strategic Partnerships',
                  description: 'Join forces with like-minded organizations and individuals to amplify our collective environmental efforts.'
                },
                {
                  icon: '💡',
                  title: 'Innovation & Research',
                  description: 'Explore cutting-edge research in AI and sustainability to solve pressing climate challenges together.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              By contacting us, you agree to our Terms & Conditions and Privacy Policy. 
              We value your privacy and are committed to protecting your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;