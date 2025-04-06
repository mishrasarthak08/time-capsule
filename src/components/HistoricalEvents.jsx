import React, { useState, useEffect } from 'react';
import { fetchHistoricalEvents } from '../services/wikipediaService';
import './HistoricalEvents.css';

const HistoricalEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateComplete, setIsDateComplete] = useState(false);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    // Check if the date is complete (has both month and day)
    setIsDateComplete(newDate.length === 10);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isDateComplete) return;

      setLoading(true);
      setError(null);
      try {
        console.log('Fetching events for date:', selectedDate);
        // Split the date and only use month and day
        const [, month, day] = selectedDate.split('-');
        const data = await fetchHistoricalEvents(month, day);
        
        if (!data || !data.selected || data.selected.length === 0) {
          throw new Error('No events found for this date');
        }
        
        // Transform the data to match our component's expected format
        const transformedEvents = data.selected.map(event => ({
          year: event.year,
          text: event.text,
          links: event.pages
        }));
        
        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedDate, isDateComplete]);

  return (
    <div className="historical-events">
      <div className="date-selector">
        <label htmlFor="date">Select a month and day:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading historical events...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}

      {!loading && !error && events.length === 0 && isDateComplete && (
        <div className="no-events">
          No historical events found for this date.
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="events-container">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-year">{event.year}</div>
              <div className="event-content">
                <p>{event.text}</p>
                {event.links && event.links.length > 0 && (
                  <a
                    href={`https://en.wikipedia.org/wiki/${event.links[0].title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="learn-more"
                  >
                    Learn More
                    <span className="arrow">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalEvents; 