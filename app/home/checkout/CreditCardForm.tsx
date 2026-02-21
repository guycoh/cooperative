"use client";
import { useState } from "react";
import Image from "next/image";


type CreditCardFormProps = {
  onPay: () => void;
};

export default function CreditCardForm({ onPay }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
      {/* כותרת */}
      <div className="flex items-center gap-3">
     
        <h2 className="text-xl font-bold text-gray-800">תשלום מאובטח</h2>
      </div>

      {/* מספר כרטיס */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">מספר כרטיס</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
        />
      </div>

      {/* שם בעל הכרטיס */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">שם בעל הכרטיס</label>
        <input
          type="text"
          placeholder="FULL NAME"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
        />
      </div>

      {/* תוקף + CVV */}
      <div className="flex gap-4">
        <div className="flex flex-1 gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">חודש</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">חודש</option>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">שנה</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">שנה</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-24">
          <label className="text-xs font-medium text-gray-700">CVV</label>
          <input
            type="text"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* כפתור תשלום */}
      <button
        onClick={onPay}
        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-bold text-lg"
      >
        שלם עכשיו
      </button>
    </div>
  );
}