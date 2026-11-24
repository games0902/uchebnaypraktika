import { NextResponse } from 'next/server'

const books = [
  { id: 1, title: 'Война и мир', author: 'Л. Толстой', year: 1869 },
  { id: 2, title: 'Преступление и наказание', author: 'Ф. Достоевский', year: 1866 },
  { id: 3, title: 'Мастер и Маргарита', author: 'М. Булгаков', year: 1967 },
]

export async function GET() {
  return NextResponse.json(books)
}
