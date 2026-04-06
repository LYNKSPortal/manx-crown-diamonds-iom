import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check credentials against environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'support@lynksportal.com';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$Pe5QDoJPcjJ90PJTEtWjzeJkNjzZDYRcc1pJ7h3AuU1xqwTd2kY82';

    console.log('Login attempt:', { email, adminEmail, hasHash: !!adminPasswordHash });

    // Verify email
    if (email !== adminEmail) {
      console.log('Email mismatch:', { provided: email, expected: adminEmail });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    console.log('Password validation:', { isValidPassword });
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    await setSession({ email, role: 'admin' });

    return NextResponse.json({
      success: true,
      user: { email, role: 'admin' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
