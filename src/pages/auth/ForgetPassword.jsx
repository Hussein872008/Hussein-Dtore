import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .matches(/^[\w-.]+@gmail\.com$/, 'Email must be a valid @gmail.com address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        toast.success('A password reset link has been sent to your email.');
        resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } catch (error) {
        const errorMessages = {
          'auth/invalid-email': 'Invalid email address.',
          'auth/user-not-found': 'No account found with this email.',
          'auth/network-request-failed': 'Network error. Please check your connection.',
          'auth/too-many-requests': 'Too many requests. Please try again later.',
        };
        toast.error(errorMessages[error.code] || 'An error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={`max-w-md w-full ${darkMode ? 'bg-[#2D2D2D] text-[#F5F2F4]' : 'bg-[#F5F2F4] text-[#465542]'} py-8 px-6 shadow rounded-lg sm:px-10 mx-auto`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold">Forgot Password?</h2>
        <p className={`mt-2 text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-gray-600'}`}>
          Enter your Gmail address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-gray-700'}`}>
            Gmail Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className={`mt-1 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B823] ${
              formik.touched.email && formik.errors.email 
                ? 'border-red-500' 
                : darkMode 
                  ? 'border-[#3D3D3D] bg-[#1A1A1A]' 
                  : 'border-gray-300 bg-white'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C2B823] hover:bg-[#DA2B50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C2B823] transition-colors disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link 
          to="/login" 
          className={`font-medium ${darkMode ? 'text-[#C2B823] hover:text-[#DA2B50]' : 'text-[#C2B823] hover:text-[#DA2B50]'}`}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;