import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Loading from './Loading';
import { HiDotsVertical, HiMicrophone } from "react-icons/hi";
import { FaAngleLeft, FaPlus, FaImage, FaVideo, FaSquarePollHorizontal } from "react-icons/fa6";
import { IoClose, IoCamera, IoDocument, IoSend } from "react-icons/io5";
import { RiContactsBook3Fill, RiEmotionFill, RiDeleteBin6Line } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import moment from 'moment';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import backgroundImage from '../assets/bg-image-dark.png';

const Message = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector(state => state?.user);

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
  });

  const [openFilesUpload, setOpenFilesUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageURL: "",
    videoURL: "",
  });
  const [isRotated, setIsRotated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [allMessage]);

  const handleUploadFilesOpen = () => {
    setOpenFilesUpload(prev => !prev);
    setIsRotated(prev => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setMessage(prev => ({
      ...prev,
      imageURL: uploadPhoto.url,
    }));
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setMessage(prev => ({
      ...prev,
      videoURL: uploadVideo.url,
    }));
  };

  const handleClearUpload = () => {
    setMessage(prev => ({
      ...prev,
      imageURL: "",
      videoURL: "",
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageURL || message.videoURL) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageURL: message.imageURL,
          videoURL: message.videoURL,
          msgByUserId: user._id
        });
        setMessage({
          text: "",
          imageURL: "",
          videoURL: "",
        });
      }
    }
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);
      socketConnection.emit('seen', params.userId);

      socketConnection.on('message-user', (data) => {
        setDataUser(data);
      });

      socketConnection.on('message', (data) => {
        console.log('message data', data);
        setAllMessage(data)
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setMessage(prev => ({
      ...prev,
      text: value,
    }));
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const addEmoji = (emoji) => {
    setMessage(prev => ({
      ...prev,
      text: prev.text + emoji.native,
    }));
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleDeleteChat = () => {
    console.log("Delete chat clicked");
    // Add your delete chat logic here
  };

  const handleBlockUser = () => {
    console.log("Block user clicked");
    // Add your block user logic here
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`}} >
      <header className="sticky top-0 h-16 bg-slate-900 flex justify-between items-center px-4 rounded-lg m-1">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden flex items-center text-slate-500">
            <FaAngleLeft size={25} />
          </Link>
          <Avatar
            width={50}
            height={50}
            imageURL={dataUser?.profile_pic}
            name={dataUser?.name}
            userId={dataUser?._id}
          />
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-xl my-0 text-ellipsis line-clamp-1 text-white">
              {dataUser?.name}
            </h3>
            <p className="text-sm -my-1">
              {dataUser.online ? (
                <span className="text-yellow-500 font-semibold ">Online</span>
              ) : (
                <span className="text-slate-400 font-semibold">Offline</span>
              )}
            </p>
          </div>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} 
          className="cursor-pointer text-slate-500 hover:text-slate-300 flex items-center">
            <HiDotsVertical size={25} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                onClick={handleDeleteChat}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <RiDeleteBin6Line className="mr-2" />
                Delete Chat
              </button>
              <button
                onClick={handleBlockUser}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ImBlocked className="mr-2" />
                Block User
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative">
        
        {/**message display field */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {
            allMessage.map((msg, index) => (
              <div className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-green-800" : "bg-gray-500"}`} key={index}>
                <div className='w-full relative'>
                  {msg?.imageURL && (
                    <img src={msg?.imageURL} className='w-full h-full object-scale-down' alt="Uploaded" />
                  )}
                  {msg?.videoURL && (
                    <video src={msg.videoURL} className='w-full h-full object-scale-down' controls />
                  )}
                </div>
                <p className='px-2 font-sans'>{msg.text}</p>
                <p className='text-xs ml-auto w-fit font-semibold'>{moment(msg.createdAt).format('hh:mm')}</p>
              </div>
            ))
          }
        </div>

        {(message.imageURL || message.videoURL) && (
          <div className="w-full h-full sticky bottom-0 bg-slate-950 bg-opacity-90 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer text-slate-300 hover:text-slate-600" onClick={handleClearUpload}>
              <IoClose size={30} />
            </div>
            <div className="bg-black p-3 rounded-lg">
              {message.imageURL && (
                <img
                  src={message.imageURL}
                  alt="uploadImage"
                  className="aspect-auto w-full h-full max-w-sm m-2 object-scale-down rounded-lg"
                />
              )}
              {message.videoURL && (
                <video
                  src={message.videoURL}
                  controls
                  autoPlay
                  className="aspect-auto w-full h-full max-w-sm m-2 object-scale-down rounded-lg"
                />
              )}
            </div>
          </div>
        )}
      </section>

      <section className="h-16 bg-slate-900 rounded-lg m-1 flex items-center px-2">
        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-start w-12 h-12 pl-3 rounded-full text-yellow-500 hover:bg-secondary hover:text-white"
              onClick={toggleEmojiPicker}
            >
              {showEmojiPicker ? <IoClose size={22} /> : <RiEmotionFill size={22} />}
            </button>
            <button
              onClick={handleUploadFilesOpen}
              className={`flex items-center justify-start w-12 h-12 pl-3 rounded-full text-lime-700 hover:bg-primary hover:text-white transition-transform duration-300 ${isRotated ? "rotate-180" : ""}`}
            >
              <FaPlus size={22} />
            </button>
          </div>

          {openFilesUpload && (
            <div className="bg-slate-600 shadow rounded absolute bottom-16 w-36 p-2">
              <form>
                <label htmlFor="uploadDocument" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-red-500">
                    <IoDocument size={18} />
                  </div>
                  <p>Document</p>
                </label>
                <label htmlFor="uploadImage" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor="uploadVideo" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <label htmlFor="uploadContact" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-green-600">
                    <RiContactsBook3Fill size={18} />
                  </div>
                  <p>Contact</p>
                </label>
                <label htmlFor="uploadCamera" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-blue-400">
                    <IoCamera size={18} />
                  </div>
                  <p>Camera</p>
                </label>
                <label htmlFor="uploadPoll" className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 rounded cursor-pointer">
                  <div className="text-yellow-500">
                    <FaSquarePollHorizontal size={18} />
                  </div>
                  <p>Poll</p>
                </label>

                <input type="file" id="uploadImage" onChange={handleUploadImage} className="hidden" />
                <input type="file" id="uploadVideo" onChange={handleUploadVideo} className="hidden" />
              </form>
            </div>
          )}
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-16">
            <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
          </div>
        )}

        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 mx-4 border-2 border-slate-600 flex my-2 rounded-lg justify-between w-full h-12 bg-slate-800 text-slate-200'
            value={message.text}
            onChange={handleOnChange}
          />
          {(message.text || message.imageURL || message.videoURL) ? (
            <button type="submit" className='text-blue-500 hover:text-primary'>
              <IoSend size={28} />
            </button>
          ) : (
            <button type="button" className="flex items-center justify-center my-3 mr-3 text-blue-500 rounded-full hover:bg-primary hover:text-white transition-transform duration-300">
              <HiMicrophone size={22} />
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default Message;
