import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserHospitalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state;

  const [showPopup, setShowPopup] = useState(false);

  if (!hospital) {
    return <p className="text-red-500 text-center mt-5">No hospital details available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <button className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer" onClick={() => navigate(-1)}>Back</button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{hospital.name}</h1>
      <img 
        src={hospital.imageUrl || "https://via.placeholder.com/400"} 
        alt={hospital.name} 
        className="w-full max-w-md rounded-lg shadow-lg mb-4"
      />

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <p className="text-lg"><strong>📍 City:</strong> {hospital.city}</p>
        <p className="text-lg"><strong>🩺 Specialities:</strong> {hospital.specialities?.length > 0 ? hospital.specialities.join(", ") : "N/A"}</p>
        <p className="text-lg"><strong>⭐ Rating:</strong> {hospital.rating ?? "Not Rated"} / 5</p>
        <p className="text-lg"><strong>👨‍⚕️ Number of Doctors:</strong> {hospital.numberOfDoctors || "N/A"}</p>
        <p className="text-lg"><strong>🏥 Departments:</strong> {hospital.numberOfDepartments || "N/A"}</p>
        <p className="text-lg"><strong>📝 Description:</strong> {hospital.description || "No description available."}</p>

        {hospital.images?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Additional Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {hospital.images.map((img, index) => (
                <img key={index} src={img} alt={`Hospital ${index + 1}`} className="rounded-lg shadow-sm" />
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        Book Appointment
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
            <p className="text-xl font-semibold text-red-600">⚠️ No slots are available at the moment.</p>
            <button 
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHospitalDetails;