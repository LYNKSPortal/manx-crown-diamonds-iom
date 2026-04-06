import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== 'master_admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Master admin access required' },
        { status: 403 }
      );
    }

    const { email, password, firstName, lastName, role } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await sql`
      INSERT INTO users (email, password, first_name, last_name, role)
      VALUES (${email}, ${hashedPassword}, ${firstName || null}, ${lastName || null}, ${role || 'admin'})
      RETURNING id, email, first_name, last_name, role, created_at
    `;

    return NextResponse.json({
      success: true,
      user: result[0],
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
