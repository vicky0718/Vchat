import React from 'react'
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageURL, width, height, color }) => {
    let avatarName = ""

    if (name) {
        const splitName = name.split(" ")

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0]
        } else {
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

    const randomNum = Math.floor(Math.random() * bgColor.length)

    return (
        <div
            className={`relative rounded-full font-semibold overflow-hidden ${!imageURL && name ? bgColor[randomNum] : ''} flex items-center justify-center`}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {imageURL ? (
                <img
                    src={imageURL}
                    alt={name}
                    className='w-full h-full object-cover'
                    style={{ width: `${width}px`, height: `${height}px` }}
                />
            ) : name ? (
                <div
                    className={`flex items-center justify-center text-lg text-slate-800`}
                    style={{ width: `${width}px`, height: `${height}px` }}
                >
                    {avatarName}
                </div>
            ) : (
                <PiUserCircle size={width} className="text-slate-800" />
            )}
        </div>
    )
}

export default Avatar