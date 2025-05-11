"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import AddToDo from './AddToDo'

const Header = (): React.JSX.Element => {
    const [isAddToDoOpen, setIsAddToDoOpen] = useState(false);
    return (
        <>
            {isAddToDoOpen && <AddToDo onClose={() => setIsAddToDoOpen(false)} />}
            <div className='bg-[#2B3E51] text-[#FFFEFB]'>
                <ul className='flex justify-between items-center gap-5 p-5 font-semibold list-none'>
                    <li className='cursor-pointer'><Link href="/"> Home</Link></li>
                    <div className='flex gap-5 justify-center items-center'>
                        <li className='cursor-pointer' onClick={() => setIsAddToDoOpen(true)}>Add Todo</li>
                        <li className='cursor-pointer'><Link href="/"> List all todo</Link></li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default Header