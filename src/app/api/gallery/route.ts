
import { NextResponse } from 'next/server';
import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const posts = await db.collection("gallery_posts").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    if (!body.imageUrl) {
        return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const post = {
        title: body.title || "Untitled",
        imageUrl: body.imageUrl,
        author: body.author || "Anonymous",
        likes: 0,
        createdAt: new Date()
    };

    const result = await db.collection("gallery_posts").insertOne(post);

    return NextResponse.json({ ...post, _id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
