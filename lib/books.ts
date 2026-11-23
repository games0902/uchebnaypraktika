export type Book = {
  id: number;
  title: string;
};

export const books: Book[] = [
  { id: 1, title: "Мастер и Маргарита" },
  { id: 2, title: "Преступление и наказание" },
  { id: 3, title: "1984" },
];

// Счётчик для новых книг: следующее число после последнего начального ID (3)
export let nextId = 4;

export function addBook(title: string): Book {
  const book: Book = { id: nextId++, title };
  books.push(book);
  return book;
}
