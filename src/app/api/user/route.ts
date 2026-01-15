import { NextResponse } from 'next/server';
import { getDatabase } from "../../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    
    // Fallback role for admin email if not set in DB
    if (!userWithoutPassword.role && userWithoutPassword.email === 'rakibulhasanmd678@gmail.com') {
      userWithoutPassword.role = 'admin';
    } else if (!userWithoutPassword.role) {
      userWithoutPassword.role = 'user';
    }

    return NextResponse.json(userWithoutPassword);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, image } = await request.json();
    const db = await getDatabase();

    // Update user in users collection
    const result = await db.collection("users").updateOne(
        { email: session.user.email },
        { $set: { name, image, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, name, image });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
