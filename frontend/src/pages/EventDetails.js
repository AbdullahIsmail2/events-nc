import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = 'https://events-nc.onrender.com'

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!event)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading...
      </div>
    );

  console.log(event);

  const handleRegistration = () => {
    axios
      .post(`${API_BASE_URL}/api/events/attendees/${id}`, { name, email })
      .then((response) => {
        alert("You have successfully registered!");
        setName("");
        setEmail("");
        setRegistered(true);
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  const addToGoogleCalendar = (event) => {
    const { name, description, location, date } = event;

    // Set default duration (2 hours after start time)
    const startTime = new Date(date);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 2);

    // Format times for Google Calendar
    const start = startTime.toISOString().replace(/-|:|\.\d+/g, "");
    const end = endTime.toISOString().replace(/-|:|\.\d+/g, "");

    // Construct Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      name
    )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
      location
    )}&dates=${start}/${end}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white shadow-md rounded-lg" role="main">
      <h1 className="text-4xl font-extrabold mb-4 font-satisfy" id="event-name">
        {event.name}
      </h1>
      <p className="text-lg text-gray-600 mb-2" aria-live="polite">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-base font-semibold text-gray-800 mb-4 break-words">
        {`Event description: ${event.description}` || "No description provided"}
      </p>
      <p className="text-base text-gray-800 mb-4">
        {`Event location: ${event.location}` || "No location provided"}
      </p>
      <div className="bg-gray-50 p-4 rounded-lg shadow-md font-semibold" aria-labelledby="attendees-title">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" id="attendees-title">
          Attendees
        </h2>
        {event.attendees.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {event.attendees.map((attendee, index) => (
              <li key={index} className="text-gray-700">
                <strong>{attendee.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No attendees</p>
        )}
      </div>
  
      <div className="mt-20 bg-transparent rounded-lg" aria-labelledby="register-title">
        <h2 className="text-xl font-semibold text-gray-800 mb-4" id="register-title">
          Register for This Event
        </h2>
  
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            aria-describedby="name-description"
          />
          <p id="name-description" className="text-sm text-gray-500">
            Please enter your full name.
          </p>
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            aria-describedby="email-description"
          />
          <p id="email-description" className="text-sm text-gray-500">
            We'll never share your email with anyone else.
          </p>
        </div>
  
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleRegistration}
          aria-label="Register for the event"
        >
          Register
        </button>
      </div>
  
      {registered && (
        <button
          onClick={() => addToGoogleCalendar(event)}
          className="mt-10 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          aria-label="Add event to Google Calendar"
        >
          Add to Google Calendar
        </button>
      )}
    </div>
  );
  
};

export default EventDetails;
