import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
// import { doctors } from "../assets/assets"


const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-20 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Top Doctors to Book</h1> 
      <p className="sm:w-1/2 text-center text-sm text-gray-500">Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-auto gap-5 pt-8 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0,10).map((item, index) => (
            <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 bg-white shadow-sm hover:shadow-md" key={index}>
                <div className="bg-gradient-to-b from-teal-50/20 to-teal-50/40 relative aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={item.image} alt="" /> 
                </div>
                <div className="p-5">
                    <div className={`flex items-center gap-2 text-xs font-semibold mb-2 ${item.available ? 'text-emerald-600' : 'text-gray-400'}`}>
                        <span className={`w-2 h-2 ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'} rounded-full`}></span>
                        <span>{item.available ? 'Available Today' : 'Not Available'}</span>
                    </div>
                    <p className="text-gray-900 text-lg font-bold leading-snug">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 font-medium">{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className="bg-teal-50/60 hover:bg-teal-50 text-teal-800 font-semibold px-12 py-3.5 rounded-xl mt-12 transition-all active:scale-95 shadow-sm shadow-teal-500/5">
        View More
      </button>
    </div>
  )
}

export default TopDoctors
