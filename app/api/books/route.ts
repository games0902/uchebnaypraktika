import { books, addBook } from "@/lib/books";

export async function GET() {
  return Response.json(books, { status: 200 });
}

export async function POST(request: Request) {
  // Читаем JSON из тела запроса; результат рассматриваем как unknown
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return Response.json(
      { error: "Некорректный JSON в теле запроса" },
      { status: 400 }
    );
  }

  // Проверяем, что получен объект (не null и не массив)
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return Response.json(
      { error: "Ожидается объект" },
      { status: 400 }
    );
  }

  const { title } = data as { title?: unknown };

  // title должен быть строкой и оставаться непустым после trim()
  if (typeof title !== "string") {
    return Response.json(
      { error: "Поле title должно быть строкой" },
      { status: 400 }
    );
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length === 0) {
    return Response.json(
      { error: "Поле title не может быть пустым" },
      { status: 400 }
    );
  }

  // Добавляем книгу со следующим числовым ID и возвращаем её со статусом 201
  const book = addBook(trimmedTitle);
  return Response.json(book, { status: 201 });
}
