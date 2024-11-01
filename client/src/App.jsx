import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import Login from './pages/Log-in'
import TaskDetails from './pages/TaskDetails'
import Tasks from './pages/Tasks'
import Trash from './pages/Trash'
import Users from './pages/Users'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'
import { Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import clsx from 'clsx'
import { IoClose } from 'react-icons/io5'
import { setOpenSidebar } from './redux/slices/authSlice'

function Layout() {
	const { user } = useSelector(state => state.auth)

	const location = useLocation()

	return user ? (
		<div className="w-full h-screen flex flex-col md:flex-row">
			<div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
				<Sidebar />
			</div>

			<MobileSideBar />

			<div className="flex-1 overflow-y-auto">
				<NavBar />

				<div className="p-4 2xl:px-10">
					<Outlet />
				</div>
			</div>
		</div>
	) : (
		<Navigate to="/log-in" state={{ from: location }} replace />
	)
}

const MobileSideBar = () => {
	const { isSidebarOpen } = useSelector(state => state.auth)
	const mobileMenuRef = useRef(null)
	const dispatch = useDispatch()

	const closeSidebar = () => {
		dispatch(setOpenSidebar(false))
	}

	return (
		<>
			<Transition
				show={isSidebarOpen}
				as={Fragment}
				enter="transition ease-in-out duration-300 transform"
				enterFrom="-translate-x-full"
				enterTo="translate-x-0"
				leave="transition ease-in-out duration-300 transform"
				leaveFrom="translate-x-0"
				leaveTo="-translate-x-full"
			>
				<div ref={mobileMenuRef} className="fixed inset-0 z-50 flex">
					<div
						className={clsx(
							'bg-white w-3/4 h-full transition-transform duration-300 transform',
							isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
						)}
					>
						<div className="w-full flex justify-end px-5 mt-5">
							<button
								onClick={closeSidebar}
								className="flex justify-end items-end"
							>
								<IoClose size={25} />
							</button>
						</div>
						<div className="">
							<Sidebar />
						</div>
					</div>
				</div>
			</Transition>
		</>
	)
}

function App() {
	return (
		<main className="w-full min-h-screen bg-[#f3f4f6]">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Navigate to={'/dashboard'} />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/completed/:status" element={<Tasks />} />
					<Route path="/in-progress/:status" element={<Tasks />} />
					<Route path="/todo/:status" element={<Tasks />} />
					<Route path="/team" element={<Users />} />
					<Route path="/trashed" element={<Trash />} />
					<Route path="/task/:id" element={<TaskDetails />} />
				</Route>

				<Route path="/log-in" element={<Login />} />
			</Routes>

			<Toaster richColors />
		</main>
	)
}

export default App
