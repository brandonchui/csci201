import { Link } from '@remix-run/react';

export default function SignUp() {
  return (
    <div className="flex flex-col items-center px-6 py-16 bg-white text-gray-800 space-y-8">
      <div className="mb-8">
        <img src="/logo.png" alt="FitLife Logo" className="h-20 w-auto mx-auto" />
      </div>

      <h1 className="text-4xl font-bold text-usc-crimson mb-4">Create Your Account</h1>

      <form className="bg-gray-50 shadow-lg rounded-lg px-8 py-10 max-w-md w-full space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
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
