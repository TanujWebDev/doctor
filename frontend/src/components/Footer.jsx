import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ----- LEFT SIDE ------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-3/4 text-gray-600 leading-6">
            CuraDoc is your trusted digital healthcare platform, connecting patients with certified medical specialists. Book online appointments easily and manage your health records effortlessly.
          </p>
        </div>

        {/* ----- MIDDLE SIDE ------- */}
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600 ">
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* ----- RIGHT SIDE ------- */}
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600 ">
                <li>+91 9350851332</li>
                <li>tanujwebdev@gmail.com</li>
            </ul>
        </div>
      </div>
      {/* ----- Copyright text ------- */}
      <div>
            <hr />
            <p className="py-5 text-sm text-center ">Copyright © 2026 CuraDoc (Tanuj) - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
