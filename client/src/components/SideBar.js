import React, { useState } from "react";
import { IoChatboxEllipsesOutline, IoLogOutOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector, useDispatch } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { logout } from "../redux/userSlice";

const SideBar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    dispatch(logout())
    navigate("/email")
    localStorage.clear()
}

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-violet-900 w-12 h-full rounded-r-lg rounded-br-lg py-5 text-blue-400 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-blue-600 rounded ${
                isActive && "bg-blue-600"
              }`
            }
            title="chat"
          >
            <IoChatboxEllipsesOutline size={35} color="white" />
          </NavLink>
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-blue-600 rounded" onClick={handleLogout}>
            <FaUserPlus size={35} color="white" title="add user" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button className="mx-auto" title={user.name} onClick={() => setEditUserOpen(true)}>
            <div className="overflow-hidden rounded-full w-10 h-10">
              <Avatar
                width={40}
                height={40}
                name={user.name}
                imageURL={user?.profile_pic}
              />
            </div>
          </button>
          <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-blue-600 rounded">
            <span>
              <IoLogOutOutline size={35} color="white" title="logout" />
            </span>
          </button>
        </div>
      </div>

      <div className=" w-full">
        <h2 className="text-xl font-bold p-4 text-slate-200 bg-violet-950 rounded-md m-1">Messages</h2>
      </div>

      {/**edit user details*/}
      {
        editUserOpen && (
          <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
        )
      }

    </div>
  );
};

export default SideBar;
