'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MeetingScheduler() {
  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: 'Dr. Smith - John Doe',
      start: '2025-02-01T10:00:00',
      end: '2025-02-01T11:00:00',
    },
    {
      id: '2',
      title: 'Dr. Brown - Jane Doe',
      start: '2025-02-02T14:00:00',
      end: '2025-02-02T15:00:00',
    },
    {
      id: '3',
      title: 'Dr. White - Michael Lee',
      start: '2025-02-03T09:00:00',
      end: '2025-02-03T10:00:00',
    },
    {
      id: '4',
      title: 'Dr. Black - Sarah Connor',
      start: '2025-02-04T11:00:00',
      end: '2025-02-04T12:00:00',
    },
    {
      id: '5',
      title: 'Dr. Green - David Zhang',
      start: '2025-02-05T10:00:00',
      end: '2025-02-05T11:00:00',
    },
    {
      id: '6',
      title: 'Dr. Blue - Emma Watson',
      start: '2025-02-06T13:00:00',
      end: '2025-02-06T14:00:00',
    },
    {
      id: '7',
      title: 'Dr. Yellow - Oliver Queen',
      start: '2025-02-07T15:00:00',
      end: '2025-02-07T16:00:00',
    },
    {
      id: '8',
      title: 'Dr. Red - Rachel Adams',
      start: '2025-02-08T12:00:00',
      end: '2025-02-08T13:00:00',
    },
    {
      id: '9',
      title: 'Dr. Violet - Peter Parker',
      start: '2025-02-09T16:00:00',
      end: '2025-02-09T17:00:00',
    },
    {
      id: '10',
      title: 'Dr. Pink - Mary Jane',
      start: '2025-02-10T08:00:00',
      end: '2025-02-10T09:00:00',
    },
    {
      id: '11',
      title: 'Dr. Orange - Bruce Wayne',
      start: '2025-02-11T14:00:00',
      end: '2025-02-11T15:00:00',
    },
    {
      id: '12',
      title: 'Dr. Purple - Clark Kent',
      start: '2025-02-12T11:00:00',
      end: '2025-02-12T12:00:00',
    },
    {
      id: '13',
      title: 'Dr. Brown - Lois Lane',
      start: '2025-02-13T09:00:00',
      end: '2025-02-13T10:00:00',
    },
    // Add other meetings here
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Handle event click
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  // Handle date click for creating new events
  const handleDateClick = (info) => {
    const doctor = prompt('Enter Doctor Name:');
    const patient = prompt('Enter Patient Name:');

    if (doctor && patient) {
      const newMeeting = {
        id: String(meetings.length + 1),
        title: `${doctor} - ${patient}`,
        start: info.dateStr,
        end: new Date(
          new Date(info.dateStr).getTime() + 60 * 60 * 1000
        ).toISOString(), // 1-hour meeting
      };

      setMeetings([...meetings, newMeeting]);
    }
  };

  return (
    <div className='p-4 bg-gray-100 min-h-screen'>
      {/* Header Section */}
      <header className='text-center py-4'>
        <h1 className='text-3xl font-semibold text-indigo-700'>
          Doctor Appointment Scheduler
        </h1>
        <p className='text-lg text-gray-600'>
          Schedule meetings between doctors and patients
        </p>
      </header>

      {/* FullCalendar Component */}
      <div className='flex justify-center'>
        <div className='w-full max-w-screen-lg'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={meetings}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            editable={true}
            height='70vh'
            customButtons={{
              addEvent: {
                text: 'Add Event',
                click: () => handleDateClick(),
              },
            }}
            eventRender={(info) => {
              info.el.classList.add(
                'hover:bg-blue-200',
                'transition-colors',
                'duration-300',
                'cursor-pointer'
              );
            }}
          />
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>Event Details</h2>
            <p>
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Start:</strong>{' '}
              {new Date(selectedEvent.start).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong>{' '}
              {new Date(selectedEvent.end).toLocaleString()}
            </p>
            <button
              className='mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
