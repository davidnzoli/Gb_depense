"use client";

import { useState, useRef } from "react";

interface CustomDatePickerProps {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
  min?: string;
  max?: string;
  required?: boolean;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  min,
  max,
  required,
}: CustomDatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pour l'exemple, on utilise l'input HTML date natif (simple, accessible)
  // Tu peux remplacer par un calendrier custom JS si tu veux plus d'interactivité

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}
      <div className="grid gap-2 w-full">
        <input
          ref={inputRef}
          type="date"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          min={min}
          max={max}
          required={required}
          onFocus={() => setShowCalendar(true)}
          onBlur={() => setShowCalendar(false)}
        />
        {/* Si tu veux ajouter une icône ou un calendrier custom, tu peux le faire ici */}
      </div>
    </div>
  );
}
