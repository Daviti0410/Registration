import { NextResponse } from "next/server";
import pool from "../../libs/connection";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

export const revalidate = 0;

export async function POST(req) {
  try {
    const { loginName, password } = await req.json();

    const db = await pool.getConnection();
    const query = "SELECT * FROM users WHERE loginName = ?";
    const [rows] = await db.execute(query, [loginName]);
    db.release();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid Login or Password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json(
        { error: "Invalid login or Password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { loginName: user.loginName, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ user }, { status: 200 });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        path: "/",
      })
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
