import React from 'react'
import error from "../../assets/error2.png"

export default function Notfound() {
    return (<>
        <div className="layout h-screen w-full flex items-center justify-center ">
            <div className="error  md:w-1/3 h-3/4">
                <img src={error} className='w-full' alt="" />
            </div>

        </div>
    </>
    )
}
