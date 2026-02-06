"use client"

import { useEffect, useState } from "react"

type Settlement = {
  id: string
  settlement_number: number
  name: string
}

export default function SettlementsManager() {
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [loading, setLoading] = useState(false)
  const [newSettlementNumber, setNewSettlementNumber] = useState("")
  const [newSettlementName, setNewSettlementName] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  // 🔹 Load all settlements
  const fetchSettlements = async () => {
    setLoading(true)
    const res = await fetch("/api/settlements")
    const data = await res.json()
    setSettlements(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSettlements()
  }, [])

  // 🔹 Add new settlement
  const handleAdd = async () => {
    if (!newSettlementNumber || !newSettlementName) return

    const res = await fetch("/api/settlements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        settlement_number: Number(newSettlementNumber),
        name: newSettlementName,
      }),
    })
    const data = await res.json()
    setSettlements((prev) => [...prev, data])
    setNewSettlementNumber("")
    setNewSettlementName("")
  }

  // 🔹 Start editing
  const startEdit = (settlement: Settlement) => {
    setEditId(settlement.settlement_number.toString())
    setEditName(settlement.name)
  }

  // 🔹 Save edit
  const saveEdit = async () => {
    if (!editId) return
    const res = await fetch("/api/aa_settlements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settlement_number: Number(editId), name: editName }),
    })
    const data = await res.json()
    setSettlements((prev) =>
      prev.map((s) => (s.settlement_number.toString() === editId ? data : s))
    )
    setEditId(null)
    setEditName("")
  }

  // 🔹 Delete settlement
  const handleDelete = async (settlement_number: number) => {
    if (!confirm("בטוח שאתה רוצה למחוק את היישוב הזה?")) return
    await fetch("/api/aa_settlements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settlement_number }),
    })
    setSettlements((prev) =>
      prev.filter((s) => s.settlement_number !== settlement_number)
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ניהול יישובים</h1>

      {/* Form להוספה */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="מספר יישוב"
          className="border p-2 rounded flex-1"
          value={newSettlementNumber}
          onChange={(e) => setNewSettlementNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="שם יישוב"
          className="border p-2 rounded flex-2"
          value={newSettlementName}
          onChange={(e) => setNewSettlementName(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          הוסף
        </button>
      </div>

      {loading ? (
        <p>טוען...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">מספר יישוב</th>
              <th className="border p-2 text-left">שם יישוב</th>
              <th className="border p-2">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {settlements.map((s) => (
              <tr key={s.settlement_number}>
                <td className="border p-2">{s.settlement_number}</td>
                <td className="border p-2">
                  {editId === s.settlement_number.toString() ? (
                    <input
                      type="text"
                      className="border p-1 rounded w-full"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    s.name
                  )}
                </td>
               <td className="border p-2 flex gap-2 justify-center">
                {editId === s.settlement_number.toString() ? (
                    <>
                    <button
                        onClick={saveEdit}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                        שמור
                    </button>
                    <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                        ביטול
                    </button>
                    </>
                ) : (
                    <>
                    <button
                        onClick={() => startEdit(s)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                        ערוך
                    </button>
                    <button
                        onClick={() => handleDelete(s.settlement_number)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                        מחק
                    </button>
                    </>
                )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
