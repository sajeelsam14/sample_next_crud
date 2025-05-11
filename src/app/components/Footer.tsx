import React from 'react'

const Footer = () => {
    return (
        <footer className='text-center p-5 font-semibold bg-[#2B3E51] text-[#FFFEFB]'>
            All right reserved to Sajeel <span>&copy;</span>  2025 - {`${new Date().getFullYear()}`}
        </footer>
    )

}

export default Footer