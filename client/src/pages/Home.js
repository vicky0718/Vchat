import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {logout, setUser} from '../redux/userSlice'
import SideBar from '../components/SideBar'
import logo from '../assets/Chat.png'

const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  //console.log("redux user", user)

  const fetchUserDetails = async()=>{
    try {
      const URL =  `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if(response.data.data.logout){
        dispatch(logout())
        navigate("/email")
      }

      console.log("current user Details", response)
    } 
    catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() =>{
    fetchUserDetails()
  }, [])

  console.log("location", location)
  const basePath = location.pathname === '/'

  return (
    <div className='grid md:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
           <SideBar/>
        </section>

        {/**message component**/}
        <section className={`${basePath && "hidden"}`}>
            <Outlet/>
        </section>

        <div className='md:flex justify-center items-center flex-col gap-2 hidden'>
          <div>
            <img
             src={logo}
             width={250}
             alt='logo'
            />
          </div>
          <p className='text-lg mt-2 text-slate-200'>Select user to Chat🌚💬🙃 </p>
        </div> 
    </div>
  )
}

export default Home
