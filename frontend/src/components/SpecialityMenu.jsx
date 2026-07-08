import { specialityData } from './../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-gray-800" id="speciality">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900" >Find by Speciality</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-500" >Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto pb-4">
        {specialityData.map((item, index) =>(
            <Link onClick={() => scrollTo(0,0)} className="flex flex-col items-center text-xs font-semibold text-gray-600 hover:text-teal-700 cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300 group" key={index} to={`/doctors/${item.speciality}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50/50 hover:bg-teal-50 flex items-center justify-center p-3 sm:p-4 mb-3 transition-colors duration-300 border border-teal-100/20 group-hover:border-teal-100 shadow-sm shadow-teal-500/5 group-hover:shadow-md">
              <img className="w-full h-full object-contain" src={item.image} alt="" />
            </div>
            <p className="tracking-wide">{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
