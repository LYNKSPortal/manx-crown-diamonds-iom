import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminLayout from '@/components/AdminLayout';
import SettingsClient from './SettingsClient';

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

        <SettingsClient email={session.email} />
      </div>
    </AdminLayout>
  );
}
