import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg } from '@fullcalendar/interaction';

export default function Calendar() {
  type CalendarEvent = {
    id?: string;
    title: string;
    start: string;
    end: string;
    color: string;
    allDay?: boolean;
  };

  // generamos id único para poder borrar/editar
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: generateId(), title: 'Cabalgata', start: '2025-07-22T09:00:00', end: '2025-07-22T11:00:00', color: '#65a30d' },
    { id: generateId(), title: 'Cosecha de arándanos', start: '2025-07-28', end: '2025-08-04', color: '#65a30d', allDay: true },
  ]);

  /* ------------ AGREGAR (sin cambios) ------------ */
  const handleDateClick = (info: DateClickArg) => {
    const dateStr = info.dateStr;
    const title = prompt('Título del evento:');
    if (!title) return;

    const type = prompt(
      'Tipo de evento:\n1. Evento de hora\n2. Todo el día (1 día)\n3. Varios días\nEscribe 1, 2 o 3:'
    );

    let start, end;
    if (type === '1') {
      const startTime = prompt('Hora inicio (ej. 09:00):', '09:00');
      const endTime = prompt('Hora fin (ej. 10:00):', '10:00');
      if (!startTime || !endTime) return;
      start = `${dateStr.split('T')[0]}T${startTime}:00`;
      end = `${dateStr.split('T')[0]}T${endTime}:00`;
    }
    else if (type === '2') {
      const date = dateStr.split('T')[0];
      start = date;
      end = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) // +1 día
        .toISOString()
        .split('T')[0];
      // NO validamos fecha de fin aquí, ya que es un solo día
    }
    else if (type === '3') {
      const days = prompt('¿Cuántos días?', '7');
      if (!days) return;
      const numDays = parseInt(days, 10);
      if (isNaN(numDays) || numDays < 1) return;
      start = dateStr.split('T')[0];
      const endDay = new Date(start);
      endDay.setDate(endDay.getDate() + numDays);
      end = endDay.toISOString().split('T')[0];
    } else return;

    if (new Date(end) <= new Date(start)) {
      alert('La fecha de fin debe ser posterior a la de inicio.');
      return;
    }

    setEvents(prev => [
      ...prev,
      { id: generateId(), title, start, end, color: '#3b82f6', allDay: type === '2' || type === '3' },
    ]);
  };

  /* ------------ BORRAR / EDITAR ------------ */
  const handleEventClick = (info: any) => {
    const action = prompt(
      `Acción sobre "${info.event.title}":\n1. Borrar\n2. Editar título\n3. Nada\nEscribe 1, 2 o 3:`
    );
    if (action === '1') {
      setEvents(prev => prev.filter(e => e.id !== info.event.id));
    } else if (action === '2') {
      const newTitle = prompt('Nuevo título:', info.event.title);
      if (newTitle) {
        setEvents(prev =>
          prev.map(e =>
            e.id === info.event.id ? { ...e, title: newTitle } : e
          )
        );
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          locale="es"
          height="auto"
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            meridiem: 'short',
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}      // ← click sobre un evento
          editable={true}                    // ← permite arrastrar (opcional)
          selectable
        />
      </div>
    </div>
  );
}