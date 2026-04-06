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
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-dark-purple">Settings</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-8">
          <SettingsClient email={session.email} />
          
          {session.role === 'master_admin' && (
            <UserManagement />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
