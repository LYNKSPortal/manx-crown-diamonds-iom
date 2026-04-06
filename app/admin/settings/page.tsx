import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminLayout from '@/components/AdminLayout';
import SettingsClient from './SettingsClient';
import UserManagement from './UserManagement';

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-purple">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Debug: Show current role */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Current Role:</strong> {session.role || 'Not set'} 
              {session.role === 'master_admin' ? ' ✓ Master Admin Access' : ' (Regular Admin)'}
            </p>
          </div>

          <SettingsClient email={session.email} />
          
          {session.role === 'master_admin' ? (
            <UserManagement />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">
                <strong>User Management:</strong> Only available to master administrators.
                Please log out and log back in if you should have master admin access.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
