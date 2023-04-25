'use client'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Login from './Login'
import Logout from './Logout'

const NavDropdown = ({ session }: any) => {
	const [showDrop, setShowDrop] = useState(false)

	return (
		<div className='sm:hidden flex justify-end text-right items-center'>
			{showDrop && (
				<div className='absolute left-0 top-[100%] bg-white z-100 w-full flex flex-col'>
					<div onClick={() => setShowDrop(false)}>close</div>
					<div></div>
					<div></div>
					<div></div>
					{!session ? <Login /> : <Logout />}
				</div>
			)}
			<Bars3Icon height={24} width={24} onClick={() => setShowDrop(true)} />
		</div>
	)
}

export default NavDropdown
