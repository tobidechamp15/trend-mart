'use client';
import { useState } from 'react';
import Image from 'next/image';
import logo from '/public/assets/Logo.svg';
import authImg from '/public/assets/authImg.svg';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        router.push('/home'); // Redirect to home page
      } else {
        setError(result.error || 'An unexpected error occurred');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex w-full bg-white text-black overflow-auto">
      <div className="w-1/2 h-screen bg-[#c7e0e5] hidden md:flex justify-evenly items-center flex-col ">
        <Image src={logo} alt="logo" /> <Image src={authImg} alt="authImg" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-[32px] items-center flex-col w-full h-screen pt-[100px]"
      >
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="success-message">
            <p>{success}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <span className="font-medium text-[40px]">Sign In</span>
          <span className="text-[#141718] text-[16px]">
            Do not have an account yet{' '}
            <a href="/signup" className="text-[#155EEF]">
              Sign Up
            </a>
          </span>
        </div>

        <div className="group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Email:</label>
        </div>
        <div className="group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Password:</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-[15px] px-[30px] rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
