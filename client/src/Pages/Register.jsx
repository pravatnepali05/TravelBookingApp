import React from 'react'
import axios from 'axios'   
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');   
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
         e.preventDefault();
         setEmail('');

         //basic validation
         if (!name || !email || !password) {
            setError('All fields are required');
            return; 
         }
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
        try {
           const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
                        name,
                           email,
                           password
                          });
            toast.success('Registration successful');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            toast.error('Registration failed. Please try again.');
            console.log(error);
            
        }
    }

  return (
    <div className="flex justify-center  bg-gray-100 pt-16">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your Name "
              required
            />
          </div>
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
          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className='text-center mt-6 text-sm text-gray-700'>Already have an account
            <a href="/login" className="text-blue-600 hover:text-blue-500 ml-1">
              Sign  In
            </a>
        </p>
      </div>
    </div>
  )
}

export default Register