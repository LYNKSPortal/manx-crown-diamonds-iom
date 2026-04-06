import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get current admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'support@lynksportal.com';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$Pe5QDoJPcjJ90PJTEtWjzeJkNjzZDYRcc1pJ7h3AuU1xqwTd2kY82';

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, adminPasswordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Generate new password hash
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Log the new hash for the user to update in their .env.local
    console.log('\n===========================================');
    console.log('PASSWORD RESET SUCCESSFUL');
    console.log('===========================================');
    console.log('Update your .env.local file with:');
    console.log(`ADMIN_PASSWORD_HASH="${newPasswordHash}"`);
    console.log('===========================================\n');

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. Check server console for new hash to update .env.local',
      newHash: newPasswordHash,
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
