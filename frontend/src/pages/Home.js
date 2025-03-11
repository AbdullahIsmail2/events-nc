import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BellIcon } from "@heroicons/react/24/outline";
import { useAdminAuth } from "../Contexts/AdminLoggedin";

const API_BASE_URL = 'https://events-nc.onrender.com'

console.log(API_BASE_URL)

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isAdmin, loginAdmin, logoutAdmin } = useAdminAuth();

  useEffect(() => {
    fetchEvents();
    console.log(API_BASE_URL, 'hiiiiiiiii')
  }, []);

  const fetchEvents = () => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/api/events/${id}`)
      .then(() => fetchEvents())
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <div className="flex gap-4">
                  <Link to={`/event/${event._id}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                      View Event
                    </button>
                  </Link>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="mt-10 text-2xl">No events added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
