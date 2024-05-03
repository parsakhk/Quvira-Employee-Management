import React, { useState } from 'react'
import DashboardLayout from '../../Components/Layout/DashboardLayout'
import InputForm from '../../Components/Common/InputForm'
import SelectInput from '../../Components/Common/SelectInput'
import Button from '../../Components/Common/Button'
import { useUsers } from '../../Core/Context/UserContext'
import { setItem } from 'localforage'
import Alert from '../../Components/Common/Alert'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    const {users, setUsers} = useUsers()

    const navigate = useNavigate()



    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [position, setPosition] = useState('')

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [age, setAge] = useState(1)
    const [gender, setGender] = useState<boolean>(true)

    const [password, setPassword] = useState('')

    const [userCreate, setUserCreated] = useState<boolean>(false)

    const createUser = () => {
        const newUser = {
            id: users.length + 1,
            username: username,
            email:email,
            position:position,
            password:password,
            isActive: true,
            isChecked: false,
            personalInfo: {
                first_name:firstName,
                last_name:lastName,
                age:age,
                gender:gender,
            }
        }
        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)
        setUserCreated(true)
        setItem("users", JSON.stringify(updatedUsers))
        setTimeout(() => {
            setUserCreated(false )
            navigate('/dashboard')
        },3000)
    }
    const CancelProcess = () => {
        setUsername("")
        setEmail("")
        setPosition("")
        setFirstname("")
        setLastname("")
        setAge(0)
        setGender(false)
        setPassword("")
    }
  return (
    <DashboardLayout>
        <h1>Create user</h1>
        <main className='py-10 lg:pl-72 px-10 font-semibold'>
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            This information will be displayed publicly so be careful what you share.
                        </p>
                        {userCreate && <Alert message='User created.'/> }
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-2'>
                                <InputForm label='Username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='sm:col-span-2'>
                                <InputForm label='Email Address' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='sm:col-span-2'>
                                <InputForm label='Position' type='text' value={position} onChange={(e) => setPosition(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Personal Information</h2>
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <InputForm label='First Name' type='text' value={firstName} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div className='sm:col-span-3'>
                                <InputForm label='Last Name' type='text' value={lastName} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className='sm:col-span-3'>
                                <InputForm label='Age' type='text' value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div className='sm:col-span-3'>
                                <SelectInput
                                    value={gender ? "male": "female"}
                                    title={"Gender"}
                                    options={[{title: "Male", value: "male"}, {title: "Female", value: "female"}]}
                                    onChange={(e) => setGender(e === "male")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Change Password</h2>
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <InputForm label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-3'>
                    <Button onClick={CancelProcess} className='rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white-400'>
                        Cancel
                    </Button>
                    <Button onClick={createUser} className='rounded-md bg-[#0099CC] px-3 py-2 text-sm font-semibold text-white-400'>
                        Create User
                    </Button>
                </div>
            </div>
        </main>
    </DashboardLayout>
  )
}

export default CreateUser