import { books } from "@/lib/books";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bookId = Number(id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }

  return Response.json(book, { status: 200 });
}
