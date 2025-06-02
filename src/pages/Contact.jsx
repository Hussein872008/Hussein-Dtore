import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const themeStyles = {
    container: {
      light: 'bg-gradient-to-br from-[#F5F2F4] to-[#E8E6E9]',
      dark: 'bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A]'
    },
    text: {
      light: 'text-[#465542]',
      dark: 'text-[#F5F2F4]'
    },
    subtext: {
      light: 'text-[#7a7a7a]',
      dark: 'text-[#A5A1A4]'
    },
    card: {
      light: 'bg-white',
      dark: 'bg-[#2D2D2D]'
    },
    input: {
      light: 'border-[#A5A1A4]',
      dark: 'border-[#3D3D3D]'
    },
    error: 'text-red-500'
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const result = await emailjs.send(
        'service_o46z6cb',
        'template_pfzc0q8',
        formData,
        '35pBPinnYHLlzY_B1'        
      );

      console.log('Email sent:', result.text);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Your message has been sent successfully!', {
        position: "top-right",
        autoClose: 5000,
        theme: darkMode ? 'dark' : 'light'
      });
    } catch (error) {
      console.error('Email sending error:', error);
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        theme: darkMode ? 'dark' : 'light'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl lg:max-w-6xl mx-auto p-8 rounded-2xl shadow-xl mt-12 mb-12 transition-colors duration-300 ${
        darkMode ? themeStyles.container.dark : themeStyles.container.light
      }`}
    >
      <motion.div 
        className="text-center mb-10"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2 
          className={`text-4xl font-extrabold mb-3 tracking-wide transition-colors duration-300 ${
            darkMode ? themeStyles.text.dark : themeStyles.text.light
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h2>
        <motion.p 
          className={`max-w-xl mx-auto transition-colors duration-300 ${
            darkMode ? themeStyles.subtext.dark : themeStyles.subtext.light
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Have questions or feedback? We'd love to hear from you! Fill the form and we'll get back ASAP.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div 
          className={`rounded-xl shadow-lg p-8 flex flex-col justify-center space-y-8 transition-colors duration-300 ${
            darkMode ? themeStyles.card.dark : themeStyles.card.light
          }`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h3 
            className={`text-2xl font-semibold border-b-2 border-[#C2B823] pb-3 transition-colors duration-300 ${
              darkMode ? themeStyles.text.dark : themeStyles.text.light
            }`}
          >
            Contact Information
          </motion.h3>

          <div className="space-y-6">
            <motion.div 
              className="flex items-center space-x-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="bg-[#C2B823] text-white p-4 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <FaEnvelope className="text-2xl" />
              </motion.div>
              <div>
                <h4 className={`font-semibold text-lg transition-colors duration-300 ${
                  darkMode ? themeStyles.text.dark : themeStyles.text.light
                }`}>
                  Email
                </h4>
                <p className={`text-sm select-text cursor-text transition-colors duration-300 ${
                  darkMode ? themeStyles.subtext.dark : themeStyles.subtext.light
                }`}>
                  husseinabdalla424@gamil.com
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="bg-[#C2B823] text-white p-4 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                <FaComment className="text-2xl" />
              </motion.div>
              <div>
                <h4 className={`font-semibold text-lg transition-colors duration-300 ${
                  darkMode ? themeStyles.text.dark : themeStyles.text.light
                }`}>
                  Customer Support
                </h4>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? themeStyles.subtext.dark : themeStyles.subtext.light
                }`}>
                  Available 24/7 for any inquiries
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {submitted ? (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`text-center p-10 rounded-xl shadow-lg transition-colors duration-300 ${
                darkMode ? themeStyles.card.dark : themeStyles.card.light
              }`}
            >
              <motion.div 
                className={`p-5 rounded-lg mb-6 shadow-inner ${
                  darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </motion.div>
              <motion.button
                onClick={() => setSubmitted(false)}
                className={`inline-block ${
                  darkMode ? 'bg-[#3b482e] hover:bg-[#465542]' : 'bg-[#465542] hover:bg-[#3b482e]'
                } text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              className={`space-y-6 rounded-xl shadow-lg p-8 transition-colors duration-300 ${
                darkMode ? themeStyles.card.dark : themeStyles.card.light
              }`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? themeStyles.text.dark : themeStyles.text.light
                }`}>
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className={`text-lg transition-colors duration-300 ${
                      darkMode ? themeStyles.subtext.dark : themeStyles.subtext.light
                    }`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border ${
                      errors.name ? 'border-red-500' : (darkMode ? themeStyles.input.dark : themeStyles.input.light)
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2B823] transition bg-transparent ${
                      darkMode ? 'text-white placeholder-gray-400' : 'text-[#465542] placeholder-[#A5A1A4]'
                    }`}
                    placeholder="Your full name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                </div>
                {errors.name && <motion.p 
                  className={`text-xs mt-1 ${themeStyles.error}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.name}
                </motion.p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? themeStyles.text.dark : themeStyles.text.light
                }`}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className={`text-lg transition-colors duration-300 ${
                      darkMode ? themeStyles.subtext.dark : themeStyles.subtext.light
                    }`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border ${
                      errors.email ? 'border-red-500' : (darkMode ? themeStyles.input.dark : themeStyles.input.light)
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2B823] transition bg-transparent ${
                      darkMode ? 'text-white placeholder-gray-400' : 'text-[#465542] placeholder-[#A5A1A4]'
                    }`}
                    placeholder="example@email.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                </div>
                {errors.email && <motion.p 
                  className={`text-xs mt-1 ${themeStyles.error}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? themeStyles.text.dark : themeStyles.text.light
                }`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border ${
                    errors.message ? 'border-red-500' : (darkMode ? themeStyles.input.dark : themeStyles.input.light)
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2B823] transition resize-none bg-transparent ${
                    darkMode ? 'text-white placeholder-gray-400' : 'text-[#465542] placeholder-[#A5A1A4]'
                  }`}
                  placeholder="Write your message here..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && <motion.p 
                  className={`text-xs mt-1 ${themeStyles.error}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message}
                </motion.p>}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-3 bg-gradient-to-r from-[#C2B823] to-[#DA2B50] hover:from-[#b1ad19] hover:to-[#c02943] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
                aria-busy={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Contact;