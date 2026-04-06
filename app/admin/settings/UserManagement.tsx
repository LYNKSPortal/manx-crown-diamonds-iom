'use client';

import { useState, useEffect } from 'react';
import { Users, Key, Shield } from 'lucide-react';

interface User {
  id: number;
  email: string;
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
          <Users className="w-6 h-6 text-dark-purple" />
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        </div>
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-dark-purple" />
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Manage admin users and reset their passwords
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
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
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{user.email}</span>
                  </div>
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
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
}
