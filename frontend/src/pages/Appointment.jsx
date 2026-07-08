import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        if (currentDate.getHours() >= 10) {
          if (currentDate.getMinutes() > 30) {
            currentDate.setHours(currentDate.getHours() + 1);
            currentDate.setMinutes(0);
          } else if (currentDate.getMinutes() > 0) {
            currentDate.setMinutes(30);
          } else {
            currentDate.setMinutes(0);
          }
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo &&
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increasing time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0]
        ? docSlots[slotIndex][0].datetime
        : new Date(new Date().setDate(new Date().getDate() + slotIndex));

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSelectedDateString = () => {
    if (docSlots.length > 0 && docSlots[slotIndex]) {
      const date = docSlots[slotIndex][0]?.datetime 
        ? new Date(docSlots[slotIndex][0].datetime) 
        : new Date(new Date().setDate(new Date().getDate() + slotIndex));
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
    return '';
  };

  useEffect(() => {
    fetchDocInfo();
    window.scrollTo(0, 0);
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo ? (
    <div className="pb-16">
      {/* -------- Header Greeting -------- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Book an Appointment</h1>
        <p className="text-gray-500 text-sm mt-1.5">
          Select your preferred date and available slot to schedule a consultation with our verified specialist.
        </p>
      </div>

      {/* -------- Main Form Grid Layout -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* -------- Left Side: Calendar & Slots -------- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Calendar / Date Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Select Date</h3>
                <p className="text-xs text-gray-400">Choose a convenient date for your visit</p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => {
                  let date = new Date();
                  date.setDate(date.getDate() + index);
                  const isSelected = slotIndex === index;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setSlotIndex(index);
                        setSlotTime(""); // Reset slot time when date changes
                      }}
                      className={`text-center py-4 px-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/20 scale-105"
                          : "bg-gray-50 hover:bg-gray-100/80 text-gray-700 hover:text-gray-900 border border-transparent"
                      }`}
                      key={index}
                    >
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "opacity-90" : "text-gray-400"}`}>
                        {daysOfWeek[date.getDay()]}
                      </p>
                      <p className="text-lg font-bold mt-1">
                        {date.getDate()}
                      </p>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Card: Time Slots */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Available Time Slots</h3>
                <p className="text-xs text-gray-400">Choose from the available timings on your selected date</p>
              </div>
            </div>

            {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {docSlots[slotIndex].map((item, index) => {
                  const isSelected = item.time === slotTime;
                  return (
                    <button
                      type="button"
                      onClick={() => setSlotTime(item.time)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center ${
                        isSelected
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-md shadow-teal-500/10 scale-[1.02]"
                          : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                      key={index}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                No slots available for this day. Please check another date.
              </div>
            )}
          </div>
        </div>

        {/* -------- Right Side: Doctor Profile Card -------- */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Top decorative glass background */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-emerald-50 to-teal-50/60 z-0" />

            {/* Profile Image */}
            <div className="relative z-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-emerald-50/50 mb-4 mt-2">
              <img className="w-full h-full object-cover" src={docInfo.image} alt={docInfo.name} />
            </div>

            {/* Name & Speciality */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-1.5 justify-center">
                <h2 className="text-xl font-bold text-gray-900">{docInfo.name}</h2>
                <img className="w-4.5 h-4.5" src={assets.verified_icon} alt="Verified" />
              </div>
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50/70 px-3 py-1 rounded-full mt-2">
                {docInfo.degree} - {docInfo.speciality}
              </p>
            </div>

            {/* Rating, Experience, Fees Stats Grid */}
            <div className="w-full grid grid-cols-3 gap-2 border-y border-gray-100 py-4 my-5 relative z-10 text-xs">
              <div className="text-center border-r border-gray-100">
                <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-sm">
                  <svg className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.8</span>
                </div>
                <p className="text-gray-400 mt-0.5 font-medium">Rating</p>
              </div>
              <div className="text-center border-r border-gray-100 flex flex-col justify-between">
                <p className="font-bold text-gray-800 text-sm mt-0.5">{docInfo.experience}</p>
                <p className="text-gray-400 mt-0.5 font-medium">Experience</p>
              </div>
              <div className="text-center flex flex-col justify-between">
                <p className="font-bold text-gray-800 text-sm mt-0.5">
                  {currencySymbol}{docInfo.fees}
                </p>
                <p className="text-gray-400 mt-0.5 font-medium">Fee</p>
              </div>
            </div>

            {/* About text */}
            <div className="w-full text-left relative z-10">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 uppercase tracking-wider">
                <span>About Doctor</span>
                <img className="w-3.5 h-3.5 opacity-60" src={assets.info_icon} alt="" />
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2 font-light">
                {docInfo.about}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* -------- Bottom Summary & Booking Confirmation Bar -------- */}
      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            <img className="w-full h-full object-cover" src={docInfo.image} alt={docInfo.name} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{docInfo.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {slotTime ? (
                <>
                  Selected: <span className="font-semibold text-emerald-600">{getSelectedDateString()}</span> at <span className="font-semibold text-emerald-600">{slotTime.toLowerCase()}</span>
                </>
              ) : (
                "Please select a date and an available slot above"
              )}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={bookAppointment}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-teal-500/10 hover:shadow-lg hover:shadow-teal-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Confirm Booking</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* -------- Related Doctors Component -------- */}
      <div className="mt-12">
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
      <div className="flex flex-col items-center gap-3">
        <svg className="w-8 h-8 text-gray-300 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p>Loading doctor details...</p>
      </div>
    </div>
  );
};

export default Appointment;

