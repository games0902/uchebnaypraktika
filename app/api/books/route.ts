import { books } from "@/lib/books";

export async function GET() {
  return Response.json(books, { status: 200 });
}
