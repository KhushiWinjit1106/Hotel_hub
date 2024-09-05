import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { CiMenuFries } from 'react-icons/ci'

const FooterLp = () => {
    const [click, setclick] = useState(false);
    const handleClick = () => setclick(!click);
    return (
        <div className=" text-white py-4 text-center relative bottom-0 left-0 w-full">
            <div className="container mx-auto ">
                <p> Hotel Hub © 2024. All rights reserved.</p>
            </div>
        </div>
    )
}

export default FooterLp
