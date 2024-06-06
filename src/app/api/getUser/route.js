export const revalidate = 0;
import { NextResponse } from "next/server";
import pool from "../../libs/connection";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const loginName = searchParams.get("loginName");
    const password = searchParams.get("password");

    const db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE loginName = ? AND password = ?";
    const [rows] = await db.execute(query, [loginName, password]);
    db.release();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid Login or Password" },
        { status: 401 }
      );
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
