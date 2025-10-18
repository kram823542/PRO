import React, { useState } from 'react';

const Newsletter = ({ 
  title = "Research Updates",
  description = "Get exclusive access to groundbreaking climate AI research",
  buttonText = "Subscribe to Updates",
  successMessage = "Thank you for joining our research community",
  variant = "default" // 'default', 'minimal', 'dark'
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [error, setError] = useState('');

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!validateEmail(newsletterEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);
    
    try {
      // Simulate API call - replace with actual API endpoint
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     email: newsletterEmail,
      //     source: 'website',
      //     timestamp: new Date().toISOString()
      //   })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // if (response.ok) {
        setNewsletterSuccess(true);
        setNewsletterLoading(false);
        setNewsletterEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setNewsletterSuccess(false);
        }, 5000);
      // } else {
      //   throw new Error('Subscription failed');
      // }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('Failed to subscribe. Please try again.');
      setNewsletterLoading(false);
    }
  };

  // Variant styles
  const variants = {
    default: {
      container: "bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white",
      input: "bg-white/20 backdrop-blur-sm placeholder-white/60 text-white border border-white/40 focus:ring-2 focus:ring-white focus:bg-white/30",
      button: "bg-white text-blue-600 hover:bg-gray-100",
      iconBg: "bg-white/20"
    },
    minimal: {
      container: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200",
      input: "bg-gray-50 placeholder-gray-500 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white",
      button: "bg-blue-600 text-white hover:bg-blue-700",
      iconBg: "bg-blue-100 text-blue-600"
    },
    dark: {
      container: "bg-gray-900 rounded-2xl shadow-xl p-6 text-white",
      input: "bg-gray-800 placeholder-gray-400 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-gray-700",
      button: "bg-blue-600 text-white hover:bg-blue-700",
      iconBg: "bg-blue-500/20 text-blue-400"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`${currentVariant.container} transition-all duration-300 hover:shadow-2xl`}>
      <div className="text-center mb-6">
        <div className={`w-12 h-12 ${currentVariant.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm leading-relaxed opacity-90">
          {description}
        </p>
      </div>
      
      {newsletterSuccess ? (
        <div className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Successfully Subscribed!</span>
          </div>
          <p className="text-sm opacity-90">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
          <div className="space-y-2">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email address"
              required
              disabled={newsletterLoading}
              className={`w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 ${currentVariant.input} ${
                error ? 'border-red-400 ring-2 ring-red-400/50' : ''
              } ${newsletterLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            />
            {error && (
              <p className="text-red-300 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={newsletterLoading}
            className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${currentVariant.button}`}
          >
            {newsletterLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                {buttonText}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}

      {/* Privacy notice */}
      <p className="text-xs text-center mt-4 opacity-70">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

// Add custom CSS for animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Newsletter;