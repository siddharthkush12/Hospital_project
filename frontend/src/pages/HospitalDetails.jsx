import { useLocation, useNavigate } from "react-router-dom";

const HospitalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state;

  if (!hospital)
    return <p className="text-center text-gray-500 text-lg mt-10">No details available.</p>;

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center py-10">
     
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        
        
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          {hospital.name}
        </h1>

        
        <div className="flex justify-center">
          <img 
            src={hospital.imageUrl || "https://via.placeholder.com/400"} 
            alt={hospital.name} 
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Information Section */}
        <div className="mt-6 space-y-3 text-gray-700">
          <p><strong>🏙️ City:</strong> {hospital.city}</p>
          <p><strong>🩺 Specialities:</strong> {hospital.specialities.length > 0 ? hospital.specialities.join(", ") : "N/A"}</p>
          <p><strong>⭐ Rating:</strong> {hospital.rating || "No rating available"}</p>
          <p><strong>📝 Description:</strong> {hospital.description || "No description provided."}</p>
          <p><strong>👨‍⚕️ Number of Doctors:</strong> {hospital.numberOfDoctors || "Not specified"}</p>
          <p><strong>🏥 Number of Departments:</strong> {hospital.numberOfDepartments || "Not specified"}</p>
        </div>

        {/* Image Gallery */}
        {hospital.images && hospital.images.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hospital.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Hospital ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default HospitalDetails;