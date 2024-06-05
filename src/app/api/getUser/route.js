export const revalidate = 0;
import { NextResponse } from "next/server";
import pool from "../../libs/connection";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "select * from users";
    const [rows] = await db.execute(query);
    db.release();

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
