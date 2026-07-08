import { assets } from "./../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-teal-600 via-teal-600 to-emerald-500 rounded-3xl px-6 md:px-10 lg:px-20 shadow-xl shadow-teal-600/5">

      {/* --------- Left Side --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-12 m-auto md:py-[8vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-extrabold leading-tight md:leading-tight lg:leading-tight tracking-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-medium opacity-90 mt-2">
          <img className="w-24 drop-shadow-sm" src={assets.group_profiles} alt="" />
          <p className="leading-relaxed">
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block"/>
            schedule your appointment hassle-free.
          </p>
        </div>
        <a href="#speciality" className="flex items-center gap-2.5 bg-white text-teal-800 font-semibold px-8 py-3.5 rounded-xl mt-4 hover:scale-105 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-lg">
            <span>Book Appointment</span>
            <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/* --------- Right Side --------- */}
      <div className="md:w-1/2 relative mt-6 md:mt-0">
        <img className="w-full md:absolute bottom-0 h-auto rounded-b-3xl md:rounded-none object-contain max-h-[105%]" src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
