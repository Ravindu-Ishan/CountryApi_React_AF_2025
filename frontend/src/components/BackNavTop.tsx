import Link from 'next/link'
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

function BackNavTop() {
  return (
    <button>
        <Link href="/">
            <IoIosArrowRoundBack  className="text-4xl" />
        </Link>
    </button>
  )
}

export default BackNavTop