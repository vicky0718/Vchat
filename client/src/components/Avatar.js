import React from 'react'
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({userId, name, imageURL, width, height}) => {

    let avatarName = ""

    if(name){
        const splitName = name?.split(" ")

        if(splitName.length > 1){
            avatarName = splitName[0][0] +splitName[1][0]
        }
        else{
            avatarName = splitName[0][0]
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-teal-200',
        'bg-cyan-200',
        'bg-rose-200',
        'bg-indigo-600',

    ]

    const randomNum = Math.floor(Math.random() * 9)
    console.log(randomNum)

  return (
    <div className={`text-slate-800 overflow-hidden rounded-full  font-semibold `} style={{width: width+"px", height: height+"px"}}>
      {
        imageURL ? (
            <img src={imageURL}
            width={width}
            height={height}
            alt={name}
            className='overflow-hidden rounded-full'
            />
        ) : (
            name ? (
                <div style={{width: width+"px", height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center text-3xl ${bgColor[randomNum]}`}>
                    {avatarName}
                </div>  
            ) : (
                <PiUserCircle
                  size={width}
                />
            )
        )
      }
    </div>
  )
}

export default Avatar
