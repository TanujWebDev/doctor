import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Cura<span className="text-teal-600 font-bold">Doc</span>, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Cura<span className="text-teal-600 font-bold">Doc</span>, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Cura<span className="text-teal-600 font-bold">Doc</span> is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Cura<span className="text-teal-600 font-bold">Doc</span> is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Cura<span className="text-teal-600 font-bold">Doc</span> is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mb-20">
        <div className="border border-gray-100 rounded-2xl px-10 py-12 flex flex-col gap-4 text-sm hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer bg-white shadow-sm group">
          <b className="text-gray-900 group-hover:text-white transition-colors duration-200">Efficiency:</b>
          <p className="text-gray-500 group-hover:text-white/90 transition-colors duration-200 font-light">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        <div className="border border-gray-100 rounded-2xl px-10 py-12 flex flex-col gap-4 text-sm hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer bg-white shadow-sm group">
          <b className="text-gray-900 group-hover:text-white transition-colors duration-200">Convenience:</b>
          <p className="text-gray-500 group-hover:text-white/90 transition-colors duration-200 font-light">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>

        <div className="border border-gray-100 rounded-2xl px-10 py-12 flex flex-col gap-4 text-sm hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer bg-white shadow-sm group">
          <b className="text-gray-900 group-hover:text-white transition-colors duration-200">Personalization:</b>
          <p className="text-gray-500 group-hover:text-white/90 transition-colors duration-200 font-light">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
