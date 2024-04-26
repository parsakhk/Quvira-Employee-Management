import { CiViewTable } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

const sidebar: any[] = [
    {
        name: 'Dashboard', path: '/dashboard', icon: <MdDashboard className='h-6 w-6 shrink-0'/>
    },
    {
        name: 'Users', path: '/users', icon: <CiViewTable className='h-6 w-6 shrink-0'/>
    }
]

export default sidebar