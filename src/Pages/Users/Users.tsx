import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layout/DashboardLayout'
import { Link } from 'react-router-dom'

import UserJson from '../../Constant/Users.json'

import IUserInterface from '../../Core/Interfaces/IUserInterface'
import { useUsers } from '../../Core/Context/UserContext'
import UserList from '../../Components/Complex/UserList'
import Pagination from '../../Components/Complex/Pagination'
import Actions from '../../Components/Complex/Actions'
import SortingOptions from '../../Components/Complex/SortingOptions'
import { setItem } from '../../Core/Storage/storage'

const Users = () => {

  const userWithCheckbox = UserJson.map((user: IUserInterface) => ({
    ...user,
    isChecked: false
  }))

  //Context
  const {users,setUsers} = useUsers()
  

  //Pagination.
  const [currentUser, setCurrentUser] = useState<IUserInterface[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemPerPage] = useState<number>(10)


  const [allChecked , setAllChecked] = useState<boolean>(false)
  const [selectedUsers, setSelectedUsers] = useState<any>([])
  const [userAction,setUserAction] = useState<string>("") 

  const indexItemAxar = currentPage * itemPerPage
  const indexItemAval = indexItemAxar - itemPerPage

  const totalPages = Math.ceil(users.length / itemPerPage)

  useEffect(() => {
    setCurrentUser(users.slice(indexItemAval, indexItemAxar))
  }, [users,currentPage, itemPerPage])



  //Functions
  const toggleAllCheckBoxes = () => {
    const updatedUsers = users.map((user: IUserInterface) => ({
      ...user, isChecked: !allChecked
    }))
    const userIds = updatedUsers.map(user => user.id)
    setSelectedUsers(userIds)
    setUsers(updatedUsers)
    setAllChecked(!allChecked)
  }

  const toggleCheckbox = (id:number) => {
    const updatedUsers = users.map(user => user.id === id ? {...user, isChecked: !user.isChecked} : user)
    const newSelectedUser = updatedUsers.find(user => user.id === id)

    if(newSelectedUser && newSelectedUser.isChecked) {
      setSelectedUsers((prev: any) => [...prev, id])
    } else {
      setSelectedUsers((prev:any) => prev.filter((userId: any) => userId != id))
    }
  }

  const selectUserToDelete = (id: number) => {
    setSelectedUsers([id])
    deleteUserHandler()
  }
  const deleteUserHandler = () => {
    const newUser: IUserInterface[] = users.filter(user => user.id !== undefined && !selectedUsers.includes(user.id));
    console.log(newUser)
    setItem("users", JSON.stringify(newUser));
    setUsers(newUser);
  };
  const resetDataHandler  = () => {
    setUsers(userWithCheckbox)
    setItem("users", JSON.stringify(userWithCheckbox))
  }
  const deactiveUsersHandler = () => {
    const updatedUsers = users.map(user => {
        if (selectedUsers.includes(user.id!)) {
            return { ...user, isActive: false };
        }
        return user;
    });
    setUsers(updatedUsers);
    setItem("users", JSON.stringify(updatedUsers));
  };
  const activeUsersHandler = () => {
      const updatedUsers = users.map(user => {
          if (selectedUsers.includes(user.id!)) {
              return { ...user, isActive: true };
          }
          return user;
      });
      setUsers(updatedUsers);
      setItem("users", JSON.stringify(updatedUsers));
  };

  const actionHandler = () => {
    switch (userAction) {
      case "del": 
        deleteUserHandler()
        break
      case "dea":
        deactiveUsersHandler()
        break
      case "res": 
        activeUsersHandler()
        break
    }
  }

  return (
    <DashboardLayout>
      <main className='py-10 lg:pl-72 font-semibold'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <h1 className='text-red text-3xl'>Users</h1>
          <div className=''>
            <div className='sm:flex sm:items-center '>
              <div className='sm:flex-auto'>
                <p className='mt-2 text-sm text-gray-700'>
                  A list of all the Quivra employes that work In Quvira or Juvira
                </p>
              </div>
              <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-3'>
                <Link to='/addUser' className='block hover:bg-[#048cb9] rounded-md bg-[#0099CC] px-3 py-2 text-center text-md font-semibold text-white'>
                  Add user
                </Link>
                <button onClick={resetDataHandler}className='bg-yellow-500 hover:bg-yellow-400 px-3 py-2 text-center rounded-md font-semibold text-white'>
                  Reset Data
                </button>
              </div>
            </div>
            <div className='mt-8 flow-root'>
              <h2>Filter</h2>
              <SortingOptions
                sortByStatus={''}
                sortByName={''}
                sortByPosition={''}
                setSortByName={() => {}}
                setSortByPosition={() => {}}
                setSortByStatus={() => {}}
                setSortByGender={() => {}}
                sortByGender={''}
                onSearchChange={() => {}}
                sortByAge={''}
                setSortByAge={() => {}}
              />
              <Actions setUserAction={setUserAction} actionHandler={actionHandler} actionOptions={[]} />
              <UserList
                users={currentUser}
                allChecked={allChecked}
                onCheckAll={toggleAllCheckBoxes}
                onCheck={toggleCheckbox}
                deleteUser={selectUserToDelete}
              />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Users