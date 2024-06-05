import { NextResponse } from "next/server";
import pool from "../../libs/connection";

export async function POST(req) {
  try {
    const { loginName, email, password } = await req.json();

    if (!loginName || !email || !password) {
      return NextResponse.json(
        { error: "This fields are required" },
        { status: 400 }
      );
    }

    const db = await pool.getConnection();
    const query =
      "INSERT INTO users (loginName, email, password) VALUES (?, ?, ?)";
    await db.execute(query, [loginName, email, password]);
    db.release();

    return NextResponse.json({ message: "Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
