import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUser, FaUserLock } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { getInitials } from '../utils/index'
import { toast } from 'sonner'
import { useLogoutMutation } from '../redux/slices/api/authApiSlice'
import { logout } from '../redux/slices/authSlice'
import AddUser from './AddUser'
import ChangePassword from './ChangePassword'

const UserAvatar = () => {
	const [openProfile, setOpenProfile] = useState(false)
	const [openPassword, setOpenPassword] = useState(false)
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [logoutUser] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutUser().unwrap()
			dispatch(logout())
			navigate('/login')
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	return (
		<>
			<div>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-blue-600">
							<span className="text-white font-semibold">
								{getInitials(user?.name)}
							</span>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
							<div className="p-4">
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => setOpenProfile(true)}
											className={`${
												active ? 'bg-gray-100' : ''
											} text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
										>
											<FaUser className="mr-2" aria-hidden="true" />
											Profile
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => setOpenPassword(true)}
											className={`${
												active ? 'bg-gray-100' : ''
											} text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
										>
											<FaUserLock className="mr-2" aria-hidden="true" />
											Change Password
										</button>
									)}
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => logoutHandler()}
											className={`${
												active ? 'bg-gray-100' : ''
											} text-red-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
										>
											<IoLogOutOutline className="mr-2" aria-hidden="true" />
											Logout
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			<AddUser open={openProfile} setOpen={setOpenProfile} userData={user} />
			<ChangePassword open={openPassword} setOpen={setOpenPassword} />
		</>
	)
}

export default UserAvatar
