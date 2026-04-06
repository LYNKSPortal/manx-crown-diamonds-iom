'use client';

import { useState, useEffect } from 'react';
import { Users, Key, Shield } from 'lucide-react';

interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [resettingPassword, setResettingPassword] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', data.error);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.password) {
      alert('Email and password are required');
      return;
    }

    if (newUser.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User created successfully!');
        setShowCreateForm(false);
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'admin',
        });
        fetchUsers(); // Refresh the user list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to create user');
      console.error('Error creating user:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleResetPassword = async (userId: number) => {
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setResettingPassword(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password reset successfully!');
        setNewPassword('');
        setSelectedUserId(null);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to reset password');
      console.error('Error resetting password:', error);
    } finally {
      setResettingPassword(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-dark-purple rounded-full p-3">
            <Users className="w-6 h-6 text-antique-gold" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-dark-purple">User Management</h2>
        </div>
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-dark-purple rounded-full p-3">
            <Users className="w-6 h-6 text-antique-gold" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-dark-purple">User Management</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-dark-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          {showCreateForm ? 'Cancel' : '+ Add New User'}
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        View and manage all admin users. Reset passwords for other users as needed.
      </p>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h3>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password * (min 6 characters)
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              >
                <option value="admin">Admin</option>
                <option value="master_admin">Master Admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 bg-dark-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {users.map(user => (
          <div key={user.id} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">
                  {user.first_name && user.last_name 
                    ? `${user.first_name} ${user.last_name}`
                    : user.first_name || user.last_name || '-'
                  }
                </h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  user.role === 'master_admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'master_admin' ? 'Master' : 'Admin'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            {selectedUserId === user.id ? (
              <div className="space-y-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min 6 chars)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    disabled={resettingPassword === user.id}
                    className="flex-1 px-4 py-2 bg-dark-purple text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {resettingPassword === user.id ? 'Resetting...' : 'Reset'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUserId(null);
                      setNewPassword('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSelectedUserId(user.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dark-purple text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            )}
          </div>
        ))}
        {users.length === 0 && (
          <div className="border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">
                    {user.first_name && user.last_name 
                      ? `${user.first_name} ${user.last_name}`
                      : user.first_name || user.last_name || '-'
                    }
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === 'master_admin' && (
                      <Shield className="w-4 h-4 text-purple-600" />
                    )}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'master_admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'master_admin' ? 'Master Admin' : 'Admin'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {selectedUserId === user.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password (min 6 chars)"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                      />
                      <button
                        onClick={() => handleResetPassword(user.id)}
                        disabled={resettingPassword === user.id}
                        className="px-4 py-2 bg-dark-purple text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      >
                        {resettingPassword === user.id ? 'Resetting...' : 'Reset'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUserId(null);
                          setNewPassword('');
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedUserId(user.id)}
                      className="flex items-center gap-2 px-4 py-2 text-dark-purple hover:bg-purple-50 rounded-lg transition-colors text-sm font-semibold"
                    >
                      <Key className="w-4 h-4" />
                      Reset Password
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
