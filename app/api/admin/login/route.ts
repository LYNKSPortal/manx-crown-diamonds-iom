import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/auth';
import { sql } from '@/lib/db';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;
const PROGRESSIVE_DELAY_MS = 1000; // 1 second per failed attempt

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

    // Check credentials against database
    const users = await sql`
      SELECT id, email, password, role, failed_login_attempts, account_locked_until, last_failed_login
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (users.length === 0) {
      // Add delay to prevent user enumeration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if account is locked
    if (user.account_locked_until) {
      const lockoutEnd = new Date(user.account_locked_until);
      const now = new Date();
      
      if (now < lockoutEnd) {
        const minutesRemaining = Math.ceil((lockoutEnd.getTime() - now.getTime()) / 60000);
        return NextResponse.json(
          { error: `Account locked due to too many failed login attempts. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}.` },
          { status: 429 }
        );
      } else {
        // Lockout period expired, reset counters
        await sql`
          UPDATE users
          SET failed_login_attempts = 0, account_locked_until = NULL
          WHERE id = ${user.id}
        `;
      }
    }

    // Progressive delay based on failed attempts
    if (user.failed_login_attempts > 0) {
      const delayMs = user.failed_login_attempts * PROGRESSIVE_DELAY_MS;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      // Increment failed attempts
      const newFailedAttempts = (user.failed_login_attempts || 0) + 1;
      
      if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
        // Lock the account
        const lockoutUntil = new Date();
        lockoutUntil.setMinutes(lockoutUntil.getMinutes() + LOCKOUT_DURATION_MINUTES);
        
        await sql`
          UPDATE users
          SET failed_login_attempts = ${newFailedAttempts},
              account_locked_until = ${lockoutUntil.toISOString()},
              last_failed_login = CURRENT_TIMESTAMP
          WHERE id = ${user.id}
        `;
        
        return NextResponse.json(
          { error: `Too many failed login attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.` },
          { status: 429 }
        );
      } else {
        // Update failed attempts
        await sql`
          UPDATE users
          SET failed_login_attempts = ${newFailedAttempts},
              last_failed_login = CURRENT_TIMESTAMP
          WHERE id = ${user.id}
        `;
        
        const attemptsRemaining = MAX_FAILED_ATTEMPTS - newFailedAttempts;
        return NextResponse.json(
          { error: `Invalid credentials. ${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining before account lockout.` },
          { status: 401 }
        );
      }
    }

    // Successful login - reset failed attempts
    await sql`
      UPDATE users
      SET failed_login_attempts = 0,
          account_locked_until = NULL,
          last_failed_login = NULL
      WHERE id = ${user.id}
    `;

    // Create session with correct role
    await setSession({ email: user.email, role: user.role as 'admin' | 'master_admin' });

    return NextResponse.json({
      success: true,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
