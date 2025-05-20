'use client';

import { loginStore, registerStore } from '@/graphql/store';
import React, { useState } from 'react';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register state
  const [storeData, setStoreData] = useState({
    store_name: '',
    owner_name: '',
    email: '',
    password: '',
    category: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const store = await loginStore(username, password);
      if (store) {
        localStorage.setItem(
          'storeInfo',
          JSON.stringify({
            storeName: store.storeName,
            email: store.email,
            ownerName: store.ownerName,
            category: store.category,
          })
        );
        localStorage.setItem('categories', JSON.stringify(store.category)); // Store categories separately

        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError('Login failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const categoryArray = storeData.category
        .split(',')
        .map((cat) => cat.trim())
        .filter(Boolean);

      const newStore = await registerStore(
        storeData.store_name,
        storeData.owner_name,
        storeData.email,
        storeData.password,
        categoryArray
      );

      if (newStore) {
        localStorage.setItem('storeName', newStore.storeName);
        localStorage.setItem('email', newStore.email);
        localStorage.setItem('categories', JSON.stringify(newStore.category)); // Store categories on register
        alert('Store registered!');
        setIsRegistering(false);
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError('Error registering store.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-10 min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <img
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/03/logo-dark.png"
          alt="Logo"
          className="pb-5 mx-auto"
        />

        {!isRegistering ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Don't have a store?{' '}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 hover:underline"
              >
                Register your store
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Register Your Store</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeData.store_name}
                  onChange={(e) => setStoreData({ ...storeData, store_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Owner Name</label>
                <input
                  type="text"
                  value={storeData.owner_name}
                  onChange={(e) => setStoreData({ ...storeData, owner_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={storeData.email}
                  onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={storeData.password}
                  onChange={(e) => setStoreData({ ...storeData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Categories (comma-separated)
                </label>
                <input
                  type="text"
                  value={storeData.category}
                  onChange={(e) => setStoreData({ ...storeData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="e.g. mobile, laptop, tablet"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
