import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      toast.success('Account created successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Registration error: ' + error.message);
      setLoading(false);
    }
  };

    return (
    <div className={`max-w-md mx-auto p-6 ${darkMode ? 'bg-[#2D2D2D] text-[#F5F2F4]' : 'bg-white text-[#465542]'} rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={`mt-1 block w-full rounded-md p-2 border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F2F4]' : 'bg-white border-[#A5A1A4] text-[#465542] focus:border-[#465542] focus:ring-1 focus:ring-[#465542]'}`}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={`mt-1 block w-full rounded-md p-2 border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F2F4]' : 'bg-white border-[#A5A1A4] text-[#465542] focus:border-[#465542] focus:ring-1 focus:ring-[#465542]'}`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 block w-full rounded-md p-2 border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F2F4]' : 'bg-white border-[#A5A1A4] text-[#465542] focus:border-[#465542] focus:ring-1 focus:ring-[#465542]'}`}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className={`mt-1 block w-full rounded-md p-2 pr-12 border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F2F4]' : 'bg-white border-[#A5A1A4] text-[#465542] focus:border-[#465542] focus:ring-1 focus:ring-[#465542]'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className={`absolute right-3 top-2/3 transform -translate-y-1/2 ${darkMode ? 'text-[#A5A1A4] hover:text-[#F5F2F4]' : 'text-[#A5A1A4] hover:text-[#465542]'} focus:outline-none`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <div className="relative">
          <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? 'text-[#F5F2F4]' : 'text-[#465542]'}`}>
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`mt-1 block w-full rounded-md p-2 pr-12 border ${darkMode ? 'bg-[#1A1A1A] border-[#3D3D3D] text-[#F5F2F4]' : 'bg-white border-[#A5A1A4] text-[#465542] focus:border-[#465542] focus:ring-1 focus:ring-[#465542]'}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(prev => !prev)}
            className={`absolute right-3 top-2/3 transform -translate-y-1/2 ${darkMode ? 'text-[#A5A1A4] hover:text-[#F5F2F4]' : 'text-[#A5A1A4] hover:text-[#465542]'} focus:outline-none`}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#465542] text-white py-2 px-4 rounded-md hover:bg-[#3a4738] transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#A5A1A4]'}`}>
          Already have an account?{' '}
          <Link
            to="/login"
            className={`${darkMode ? 'text-[#DA2B50] hover:text-[#C2B823]' : 'text-[#DA2B50] hover:underline'}`}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;