import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from './../assets/assets'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const navigate = useNavigate()

    const {token, setToken, userData} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logOut = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-6 border-b border-gray-100">
      <img onClick={() => navigate('/')} className="w-40 cursor-pointer transition-transform hover:scale-[1.02]" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
        <NavLink to="/">
            <li className="py-1 hover:text-teal-600 transition-colors">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to="/doctors">
            <li className="py-1 hover:text-teal-600 transition-colors">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to="/about">
            <li className="py-1 hover:text-teal-600 transition-colors">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to="/contact">
            <li className="py-1 hover:text-teal-600 transition-colors">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden"/>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {
            token && userData
            ? <div className="flex items-center gap-2 cursor-pointer group relative py-2">
                <img className="w-8 h-8 rounded-full object-cover border border-teal-100" src={userData.image} alt="" />
                <img className="w-2" src={assets.dropdown_icon} alt="" />
                <div className="absolute top-full right-0 pt-2 text-sm font-medium text-gray-600 z-50 hidden group-hover:block">
                    <div className="min-w-48 bg-white border border-gray-100 shadow-xl rounded-xl flex flex-col gap-1 p-2">
                        <p onClick={() => navigate('my-profile')} className="hover:bg-teal-50/65 hover:text-teal-700 px-3 py-2 rounded-lg transition-all cursor-pointer">My Profile</p>
                        <p onClick={() => navigate('my-appointments')} className="hover:bg-teal-50/65 hover:text-teal-700 px-3 py-2 rounded-lg transition-all cursor-pointer">My Appointments</p>
                        <p onClick={logOut} className="hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-lg transition-all cursor-pointer border-t border-gray-50 mt-1">Logout</p>
                    </div>
                </div>
            </div>
            : 
             <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-sm shadow-teal-500/10 hover:shadow-md hover:shadow-teal-500/20 active:scale-95 transition-all duration-200 hidden md:block">Create account</button>
        }
       <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="" />
       {/* ------- Mobile Menu ------- */}
       <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all`}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-50">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-8 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-6 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-all inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-6 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-all inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-6 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-all inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-6 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-all inline-block'>CONTACT</p></NavLink>
        </ul>
       </div>
      </div>
    </div>
  )
}

export default Navbar
