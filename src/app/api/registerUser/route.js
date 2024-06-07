import { NextResponse } from "next/server";
import pool from "../../libs/connection";
import bcrypt from "bcrypt";
import { registrationSchema } from "@/app/libs/validation";

const SALT_ROUNDS = 10;

export async function POST(req) {
  try {
    const { loginName, email, password } = await req.json();

    await registrationSchema.validate({
      loginName,
      email,
      password,
      confirmPassword,
    });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const db = await pool.getConnection();
    const query =
      "INSERT INTO users (loginName, email, password) VALUES (?, ?, ?)";
    await db.execute(query, [loginName, email, hashedPassword]);
    db.release();

    return NextResponse.json({ message: "Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
