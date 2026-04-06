import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || session.role !== 'master_admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Master admin access required' },
        { status: 403 }
      );
    }

    const users = await sql`
      SELECT id, email, role, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
