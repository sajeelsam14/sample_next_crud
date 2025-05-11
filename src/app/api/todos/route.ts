/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return Response.json({ todos });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title }: any = body;
  if (!title) {
    return new Response("Title is required", { status: 400 });
  }
  const todo = await prisma.todo.create({ data: { title } });
  return Response.json({ todo });
}
