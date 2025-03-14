import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://events-nc.onrender.com'

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !date) {
      setError('Please fill in both name and date.');
      return;
    }

    axios.post(`${API_BASE_URL}/api/events`, { name, date, location, description })
      .then(() => {
        setSuccess('Event created successfully!');
        setError(null);
        setTimeout(() => navigate('/'), 2000); 
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to create event. Please try again.');
        setSuccess(null);
      });
  };

  return (
    <div className="container mx-auto p-4" role="main">
      <h1 className="text-2xl font-bold mb-4 text-white" id="create-event-title">
        Create Event
      </h1>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      {success && <p className="text-green-500 mb-4" role="status">{success}</p>}
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-4 py-6 mb-4 max-w-lg mx-auto"
        aria-labelledby="create-event-title"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name"
            placeholder="Enter event name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            aria-required="true"
            aria-describedby="name-description"
          />
          <p id="name-description" className="text-sm text-gray-500">
            Please provide a name for the event.
          </p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Event Date <span className="text-red-500">*</span>
          </label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            aria-required="true"
            aria-describedby="date-description"
          />
          <p id="date-description" className="text-sm text-gray-500">
            Select the date for your event.
          </p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Event Location
          </label>
          <input 
            type="text" 
            id="location"
            placeholder="Enter event location" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            aria-describedby="location-description"
          />
          <p id="location-description" className="text-sm text-gray-500">
            Enter the location of the event, if applicable.
          </p>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Event Description
          </label>
          <textarea 
            id="description"
            placeholder="Enter event description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            aria-describedby="description-description"
          />
          <p id="description-description" className="text-sm text-gray-500">
            Provide a brief description of the event.
          </p>
        </div>
  
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          aria-label="Create event"
        >
          Create Event
        </button>
      </form>
    </div>
  );
  
};

export default CreateEvent;
