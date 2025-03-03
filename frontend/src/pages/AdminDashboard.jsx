import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hospitals`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHospitals(res.data);
    } catch (error) {
      console.error("Error fetching hospitals", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/hospitals/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      alert("Hospital deleted successfully!");
      fetchHospitals();
    } catch (error) {
      console.error("Error deleting hospital", error);
      alert("Failed to delete hospital.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    
      <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
          Logout
        </button>
      </div>

      
      <p className="mt-4 text-lg font-semibold text-gray-700 text-center">
        Welcome, Admin! Manage hospitals below.
      </p>

      
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/add-hospital")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Add New Hospital
        </button>
      </div>

      
      <h2 className="mt-8 text-2xl font-bold text-gray-700 text-center">Hospital List</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={hospital.imageUrl || "https://via.placeholder.com/300"}
                alt={hospital.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{hospital.name}</h3>
                <p className="text-gray-600"><strong>City:</strong> {hospital.city}</p>
                <p className="text-gray-600"><strong>Specialities:</strong> {hospital.specialities.join(", ")}</p>
                <p className="text-gray-600"><strong>Rating:</strong> ⭐ {hospital.rating}</p>

                
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/edit-hospital/${hospital._id}`, { state: hospital })}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/hospital-details/${hospital._id}`, { state: hospital })}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(hospital._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;