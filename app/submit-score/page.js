'use client'
import { useState } from 'react'

export default function SubmitScore() {
  const [form, setForm] = useState({ name: '', score: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Score submitted: ${form.name} - ${form.score}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submit Your Score</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
        <input
          type="text"
          placeholder="Player Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Score"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}
