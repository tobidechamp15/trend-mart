'use client';
import { useState } from 'react';
import Image from 'next/image';
import authImg from '/public/assets/authImg.svg';
import logo from '/public/assets/Logo.svg';

export default function Signup() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading

    // Call the signup API or handle form data
    try {
      setError(null); // Reset previous errors
      setSuccess(null); // Reset previous errors

      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError('User already exists');
      }

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userName, email, password }),
      });

      const data = await res.json();

      setLoading(false); // End loading

      if (res.ok) {
        setError(null);
        // Display success message or handle post-signup logic
        setSuccess('Signup successful!');
        // Redirect to a different page if necessary
      } else {
        // setError(data.message || 'Signup failed! Please try again.');
      }
    } catch (error) {
      setLoading(false); // End loading if there's an error
      setError('Something went wrong! Please try again later.');
      console.error('Signup error:', error);
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
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <span className="font-medium text-[40px]">Sign Up</span>
          <span className="text-[#141718] text-[16px]">
            Already have an account?{' '}
            <a href="/login" className="text-[#155EEF]">
              Sign In
            </a>
          </span>
        </div>
        <div className="group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Your name:</label>
        </div>

        <div className="group">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="input"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Username:</label>
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
        <div className="group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Confirm Password:</label>
        </div>
        <div className="flex w-[60%]">
          <label className="custom-checkbox">
            <input
              name="dummy"
              type="checkbox"
              value={agree}
              required
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="text-[#6C7275]">
            I agree with
            <span className="text-black font-medium"> Privacy Policy </span>
            and
            <span className="text-black font-medium"> Terms of Use</span>
          </span>
        </div>
        <button
          type="submit"
          className="bg-black text-white py-[15px] px-[30px] rounded-md"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
