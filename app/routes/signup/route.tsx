import { Link } from '@remix-run/react';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //TODO this fits my schema the backend provided but subject to change
        body: JSON.stringify({
          email: formData.email,
          hashedPassword: formData.password,
          weightPounds: 0,
          heightInches: 0,
          age: 0,
          gender: "U",
          goal: "none"
        }),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log('Registration successful:', userData);

      // localStorage or state management but probably doesn't matter tbh
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userEmail', userData.email);

      // redirect
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-16 bg-white text-gray-800 space-y-8">
      <div className="mb-8">
        <img src="/logo.png" alt="FitLife Logo" className="h-20 w-auto mx-auto" />
      </div>

      <h1 className="text-4xl font-bold text-usc-crimson mb-4">Create Your Account</h1>

      {error && (
        <div className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-50 shadow-lg rounded-lg px-8 py-10 max-w-md w-full space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usc-crimson"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usc-crimson"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usc-crimson"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-usc-gold text-white font-semibold rounded-md hover:bg-yellow-500 transition ease-in-out duration-200"
        >
          Sign Up
        </button>
      </form>

      <p className="text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-usc-crimson font-semibold hover:underline">
          Log In
        </Link>
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-block text-usc-crimson font-semibold hover:underline transition ease-in-out duration-200"
      >
        Continue as Guest
      </Link>
    </div>
  );
}