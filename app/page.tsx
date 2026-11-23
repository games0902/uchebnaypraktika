'use client'
import type { PersonalFact } from './types'
import { useState, useEffect } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFactId, setExpandedFactId] = useState<string | null>(null)
  const [factsList, setFactsList] = useState<PersonalFact[]>([
    { id: '1', title: 'hobby', summary: 'Люблю играть', details: ['Dota', 'Rust', 'Counter Strike 2'], image: '@/image/dota.jsx' },
    { id: '2', title: 'шмуранова', summary: 'я знаю что она поедет в питер', details: ['с подругой'], image: '/' },
    { id: '3', title: 'илья', summary: 'илья курит CAMEL', details: ['', ''], image: '' },
  ])
  const [newTitle, setNewTitle] = useState('')
  const [newSummary, setNewSummary] = useState('')
  const [background, setBackground] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('cards-background')
    if (saved) setBackground(saved)
  }, [])

  const filteredFacts = factsList.filter((f) => f.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8 font-sans">
      <h1 className="text-5xl text-center font-bold text-gray-900">Салов Евгений</h1>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-600">Текущий поиск: "{searchTerm}"</p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Настройка фона карточек</h3>
        <div className="flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="background" checked={background == 'light'} onChange={() => { setBackground('light'); localStorage.setItem('cards-background', 'light') }} className="mr-2 accent-blue-600" />
            Светлый фон
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="background" checked={background == 'dark'} onChange={() => { setBackground('dark'); localStorage.setItem('cards-background', 'dark') }} className="mr-2 accent-blue-600" />
            Тёмный фон
          </label>
        </div>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        if (!newTitle || !newSummary) return
        setFactsList([...factsList, { id: Date.now().toString(), title: newTitle, summary: newSummary, details: [], image: '' }])
        setNewTitle('')
        setNewSummary('')
      }} className="space-y-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Добавить новый факт</h3>
        <input type="text" placeholder="Название" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea placeholder="Описание" value={newSummary} onChange={(e) => setNewSummary(e.target.value)} rows={2} maxLength={100} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden" />
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-duration-200">Добавить</button>
      </form>

      <section className="profile-section">
        <h2 className="text-2xl font-bold text-gray-800">Что я изучаю</h2>
        <p className="text-lg text-gray-600">Next.js, TypeScript и Tailwind CSS</p>
      </section>

      <section className="profile-section">
        <h2 className="text-2xl font-bold text-gray-800">Чем увлекаюсь</h2>
        <p className="text-lg text-gray-600">Люблю играть в Dota 2 и гулять по городу</p>
      </section>

      <section className="profile-section">
        <h2 className="text-2xl font-bold text-gray-800">Цели</h2>
        <p className="text-lg text-gray-600">Освоить Next.js и найти работу в крутой IT-компании</p>
      </section>

      <h2 className="text-3xl font-bold text-center text-gray-900 mt-12 mb-6">Интересные факты</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredFacts.map((fact) => {
          const isExpanded = expandedFactId == fact.id
          const isDark = background == 'dark'
          const cardBg = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          const mutedText = isDark ? 'text-gray-300' : 'text-gray-500'
          const btnBg = isDark ? 'text-blue-400 bg-blue-900 hover:bg-blue-800' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
          const delColor = isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
          const borderColor = isDark ? 'border-gray-700' : 'border-gray-100'

          return (
            <div key={fact.id} className={`group ${cardBg} rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer`} onClick={() => alert(`Ты выбрал раздел: ${fact.title}!`)}>
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                {fact.image ? <img src={fact.image} alt={fact.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="flex items-center justify-center h-full font-bold">Нет фото</div>}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-xl">{fact.title}</h3>
                <p className={`${mutedText} mt-2 text-sm leading-relaxed`}>{fact.summary}</p>

                {isExpanded && fact.details.filter(d => d).length > 0 && (
                  <div className={`${borderColor} mt-4 pt-4 border-t`}>
                    <h4 className="text-sm font-semibold">Детали:</h4>
                    <ul className={`text-sm ${mutedText} space-y-1`}>
                      {fact.details.filter(d => d).map((detail, i) => <li key={i} className="flex items-start"><span className="mr-2">•</span> {detail}</li>)}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setExpandedFactId(isExpanded ? null : fact.id) }} className={`px-4 py-2 font-medium rounded-full transition-duration-200 ${btnBg}`}>
                    {isExpanded ? 'Скрыть описание' : 'Показать описание'}
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFactsList(factsList.filter(f => f.id != fact.id)) }} className={`px-3 py-1 text-sm rounded hover:bg-red-100 ${delColor}`}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
