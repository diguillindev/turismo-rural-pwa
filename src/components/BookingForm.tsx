import React, { useState } from 'react';

export default function BookingForm() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = `Hola, quiero reservar ${fd.get('activity')} para ${fd.get('date')} (${fd.get('people')} personas).`;
    window.open(`https://wa.me/56949684270?text=${encodeURIComponent(text)}`);
    setDone(true);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 p-6 gap-4 max-w-sm mx-auto">
      <h3 className="text-lg font-bold">Reserva tu actividad</h3>
      <select name="activity" className="select select-bordered">
        <option>Cabalgata</option>
        <option>Merienda</option>
        <option>Almuerzo</option>
      </select>
      <input name="date" type="date" required className="input input-bordered" />
      <input name="people" type="number" min="1" placeholder="Nº personas" required className="input input-bordered" />
      <button type="submit" className="btn btn-primary">Reservar por WhatsApp</button>
      {done && <span className="text-success">✓ Redirigiendo…</span>}
    </form>
  );
}