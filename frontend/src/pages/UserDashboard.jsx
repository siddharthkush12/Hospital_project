import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/hospitals?city=${city.toLowerCase()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.length === 0) {
        setHospitals([]);
        setError("No hospitals found!");
      } else {
        setHospitals(res.data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch hospitals. Please try again later.");
      setHospitals([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHospitals();
  }, [city]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?hospital,healthcare')",
      }}
    >
      <div className="relative w-full max-w-6xl bg-white bg-opacity-90 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">
            🌍 Discover Top Hospitals in Your City
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search hospitals by city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.length > 0
            ? hospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-400 transform hover:scale-95"
                >
                  <img
                    src={hospital.imageUrl || "https://via.placeholder.com/300"}
                    alt={hospital.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-2 text-blue-700">
                    {hospital.name}
                  </h3>
                  <p>
                    <strong>📍 City:</strong> {hospital.city}
                  </p>
                  <p>
                    <strong>🩺 Specialities:</strong>{" "}
                    {hospital.specialities.length > 0
                      ? hospital.specialities.join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>⭐ Rating:</strong> {hospital.rating || "Not Rated"}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/user-hospital-details`, { state: hospital })
                    }
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition cursor-pointer"
                  >
                    View More
                  </button>
                </div>
              ))
            : !loading && (
                <p className="text-center text-gray-500">No hospitals found.</p>
              )}
        </div>

        {loading && <p className=" text-gray-600">⏳ Loading hospitals...</p>}
        {error && <p className=" text-red-500">{error}</p>}
        {hospitals.length > 0 && !loading && (
          <p className="my-10 text-gray-700 mb-4">
            <strong>🏥 Total Hospitals Found:</strong> {hospitals.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
