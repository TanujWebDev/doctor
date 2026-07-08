import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {

  const {backendUrl, token, slotDateFormat, getDoctorsData} = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  
  const navigate = useNavigate()

  const getUserAppointments = async() => {

    try {
      
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {headers: {token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id';
    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) =>{
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers: {token}})
          if(data.success){
            toast.success("Payment Successful!")
            getUserAppointments()
            navigate('/my-appointments')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } else {
      toast.error("Razorpay SDK failed to load. Please refresh the page.")
    }
  }

  const appointmentRazorpay = async(appointmentId)=> {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers: {token}})
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      getUserAppointments()
    }
  }, [token])


  return (
    <div className="pb-16">
      <p className="pb-3 mt-12 font-bold text-gray-900 border-b border-gray-100 text-lg">My Appointments</p>
      <div className="mt-4 space-y-4">
        {appointments.map((item, index) => (
          <div className="flex flex-col sm:flex-row gap-5 p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300" key={index}>
            <div className="w-full sm:w-32 h-32 rounded-xl bg-teal-50/20 overflow-hidden flex-shrink-0 flex items-center justify-center border border-teal-50/30">
              <img className="w-full h-full object-cover" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-gray-500">
              <p className="text-gray-900 font-extrabold text-lg leading-snug">{item.docData.name}</p>
              <p className="text-teal-600 font-semibold text-xs mt-1 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block">{item.docData.speciality}</p>
              <p className="text-gray-800 font-semibold mt-3 text-xs uppercase tracking-wider">Address:</p>
              <p className="text-xs text-gray-400 mt-1">{item.docData.address.line1}</p>
              <p className="text-xs text-gray-400">{item.docData.address.line2}</p>
              <p className="text-xs text-gray-600 mt-3 font-medium">
                <span className="text-gray-400 mr-1 font-normal">Date & Time:</span> 
                <span className="font-semibold text-gray-800">{slotDateFormat(item.slotDate)}</span> | <span className="font-semibold text-gray-800">{item.slotTime}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2.5 justify-end w-full sm:w-auto mt-4 sm:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <span className="sm:min-w-48 text-center py-2.5 border border-emerald-200 rounded-xl text-emerald-600 bg-emerald-50/40 text-xs font-bold tracking-wide">
                  Paid
                </span>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  type="button"
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-xs text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-center sm:min-w-48 py-2.5 rounded-xl font-bold shadow-sm shadow-teal-500/10 hover:shadow-md hover:shadow-teal-500/20 transition-all duration-300 active:scale-95"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  type="button"
                  onClick={() => cancelAppointment(item._id)}
                  className="text-xs text-gray-500 font-semibold text-center sm:min-w-48 py-2.5 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 active:scale-95"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <span className="sm:min-w-48 text-center py-2.5 border border-red-200 rounded-xl text-red-500 bg-red-50/30 text-xs font-semibold">
                  Appointment Cancelled
                </span>
              )}
              {item.isCompleted && (
                <span className="sm:min-w-48 text-center py-2.5 border border-emerald-200 rounded-xl text-emerald-600 bg-emerald-50/30 text-xs font-semibold">
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
