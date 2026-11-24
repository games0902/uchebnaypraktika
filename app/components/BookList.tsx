'use client'

import { useState, useEffect } from 'react'

type Book = {
  id: number | string
  title: string
  author?: string
  year?: number
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Один GET-запрос при открытии страницы
    fetch('/api/books')
      .then((response) => {
        // Проверяем response.ok перед чтением JSON
        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-600">Загрузка списка книг...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <ul className="list-disc pl-6 space-y-1">
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
