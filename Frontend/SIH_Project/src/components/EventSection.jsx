import React from 'react';

const EventSection = ({ events }) => {
  return (
    <div className="events-section bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Upcoming College Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-gray-100 p-4 rounded-lg transition-shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Location: {event.location}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Sponsor This Event</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
