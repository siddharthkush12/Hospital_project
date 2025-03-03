import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditHospital = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const hospitalData = location.state || {};

  const [hospital, setHospital] = useState(hospitalData);

  useEffect(() => {
    if (!hospitalData.name) {
      fetchHospitalDetails();
    }
  }, []);

  const fetchHospitalDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hospitals/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHospital(res.data);
    } catch (error) {
      console.error("Error fetching hospital details", error);
      alert("Failed to load hospital details.");
    }
  };

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/hospitals/update?id=${hospital._id}`, hospital, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Hospital updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating hospital", error);
      alert("Failed to update hospital.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hos.jpg')" }}>

      
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Hospital</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-600">Hospital Name</label>
            <input type="text" name="name" placeholder="Enter hospital name"
              value={hospital.name || ""} onChange={handleChange} required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">City</label>
            <input type="text" name="city" placeholder="Enter city"
              value={hospital.city || ""} onChange={handleChange} required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Image URL</label>
            <input type="text" name="imageUrl" placeholder="Enter image URL"
              value={hospital.imageUrl || ""} onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Specialities (comma-separated)</label>
            <input type="text" name="specialities" placeholder="e.g. Cardiology, Neurology"
              value={hospital.specialities || ""} onChange={handleChange} required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Rating</label>
            <input type="number" name="rating" placeholder="Enter rating (1-5)"
              value={hospital.rating || ""} onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Description</label>
            <textarea name="description" placeholder="Enter hospital description"
              value={hospital.description || ""} onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Number of Doctors</label>
              <input type="number" name="numberOfDoctors" placeholder="Enter number of doctors"
                value={hospital.numberOfDoctors || ""} onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600">Number of Departments</label>
              <input type="number" name="numberOfDepartments" placeholder="Enter number of departments"
                value={hospital.numberOfDepartments || ""} onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
            Update Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHospital;