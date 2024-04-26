import React from 'react'
import { MdDashboard } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";

import logo from '../../Assets/vite.svg'
import sidebar from '../../Constant/Sidebar';
import { Link } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';


const DesktopLayout = ({buttonClick,activePage}: {buttonClick: () => any, activePage: string}) => {
  return (
    <>
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col font-semibold'>
            <div className='flex grow flex-col gap-y-5 overflow-auto bg-gray-900 px-6'>
                <div className='flex h-16 shrink-0 items-center'>
                    <img
                        className='h-8 w-auto'
                        src={logo}
                        alt='Your company'
                    >
                    
                    </img>
                    <h1 className='text-white ml-2 text-[15px]'>Quvira employee management</h1>
                </div>
                <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        {sidebar.map((item: any, key) => (
                            <Link to={item.path} key={key} className={`${item.path.toLowerCase() === activePage ? "bg-gray-800": "bg-gray-900"} text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 `}>
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}

                    </ul>
                </nav>
            </div>
        </div>
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button onClick={buttonClick} type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
                    <IoMdMenu />

            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-white">
                    Dashboard
            </div>

        </div>
    </>
  )
}

export default DesktopLayout