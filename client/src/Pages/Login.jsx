import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState(''); 
    const [error, setError] = React.useState('');
    const[auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
                email,
                password
            });

            toast.success('Login successful');
            setAuth({
              ...auth,
                // Assuming the response contains user data and a token
                user: response.data?.user,
                token: response.data?.token
            });
            localStorage.setItem('auth', JSON.stringify(response.data)); 
                
            
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
            toast.error('Login failed. Please try again.');
            console.log(error);
        }
    };
  return (
    <div className="flex justify-center  bg-gray-100 pt-16">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                 className="mr-2 h-4 w-4 accent-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              Keep me signed in
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot Password?
            </a>
          </div>
            {error && (
                <div className="mb-4 text-red-600 text-sm mt-3">
                {error}
                </div>
            )}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className='text-center mt-6 text-sm text-gray-700'>Don't have an account
            <a href="/register" className="text-blue-600 hover:text-blue-500 ml-1">
              Sign Up 
            </a>
        </p>
      </div>
    </div>
  )
}

export default Login