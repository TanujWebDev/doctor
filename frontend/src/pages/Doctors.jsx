import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.speciality &&
            doc.speciality.trim().toLowerCase() === speciality.trim().toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="pb-16">
      <p className="text-gray-500 text-sm">Browse through the doctors by specialty.</p>
      <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">
        <button
          type="button"
          className={`py-2 px-5 border rounded-xl text-xs font-bold transition-all sm:hidden shadow-sm ${
            showFilter ? "bg-teal-600 text-white border-transparent" : "bg-white border-gray-200 text-gray-700"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-3 text-sm min-w-48 ${showFilter ? "flex" : "hidden sm:flex"}`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => {
            const isSelected = speciality === spec;
            return (
              <p
                key={spec}
                onClick={() =>
                  isSelected ? navigate("/doctors") : navigate(`/doctors/${spec}`)
                }
                className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-12 border rounded-xl transition-all cursor-pointer font-semibold text-xs ${
                  isSelected
                    ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm shadow-teal-500/5"
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900"
                }`}
              >
                {spec}
              </p>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-auto gap-5 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 bg-white shadow-sm hover:shadow-md"
              key={index}
            >
              <div className="bg-gradient-to-b from-teal-50/20 to-teal-50/40 relative aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={item.image} alt="" />
              </div>
              <div className="p-5">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold mb-2 ${
                    item.available ? "text-emerald-600" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 ${item.available ? "bg-emerald-500 animate-pulse" : "bg-gray-300"} rounded-full`}
                  ></span>
                  <span>{item.available ? "Available Today" : "Not Available"}</span>
                </div>
                <p className="text-gray-900 text-lg font-bold leading-snug">{item.name}</p>
                <p className="text-gray-500 text-xs mt-0.5 font-medium">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
