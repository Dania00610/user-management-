import { useState } from 'react';
import { useSessionStore } from '../store/sesssionstore'; 

const Login = () => {
  const setAccessToken = useSessionStore((state) => state.setAccessToken); 
  const [email, setEmail] = useState('academy@gmail.com');
  const [password, setPassword] = useState('academy123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data?.accessToken) {
        
        setAccessToken(data.accessToken);
        
     
        window.localStorage.setItem('accessToken', data.accessToken);

        
        window.location.href = '/dashboard'; 
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-sm w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'} {}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
