import React, { useState } from 'react'
import DesktopLayout from './DesktopLayout'
import { useLocation } from 'react-router-dom'
import MobileLayout from './MobileLayout'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const location = useLocation()


    const OpenSidebar = (): void => {
        setIsOpen(!isOpen)
    }
    const activePage = location.pathname
  return (
    <div>
        <MobileLayout closeSideBar={OpenSidebar} isOpen={isOpen} />
        <DesktopLayout buttonClick={OpenSidebar} activePage={activePage}/>

        {children}
    </div>
  )
}

export default DashboardLayout