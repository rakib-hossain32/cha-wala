import { NextResponse } from 'next/server';
import { getDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    
    // Total Stats
    const totalOrders = await db.collection("orders").countDocuments();
    const pendingOrders = await db.collection("orders").countDocuments({ status: "Pending" });
    const totalUsers = await db.collection("users").countDocuments();
    
    const orders = await db.collection("orders").find({}).toArray();
    const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Sales by Category (Mock data if categories not available, else aggregate)
    // For now, let's just get the last 7 days of orders for a chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentOrders = await db.collection("orders")
      .find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json({
      stats: {
        totalOrders,
        pendingOrders,
        totalUsers,
        totalSales,
      },
      recentOrders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
