"use client"

import { getCountries } from '@/src/api/apis'
import React, { useEffect, useState } from 'react'
import { CustomNav } from '@/src/components/CustomNav'
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
import BackgrounMap from '@public/BackgroundMap.svg'

function Page() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getCountries()
    if (data != null) {
      setData(data)
    }
  }

  const filteredData = data.filter((item: any) =>
    item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-[url(BackgrounMap)] bg-no-repeat ">
      <CustomNav />
      <div className='flex flex-col items-center'>
        <div className='flex-row py-5'>
          <img src="BrandTitle.svg" alt="Brand Title" />
        </div>

        <div className="inline-flex items-center max-w-3xl p-1 rounded-xl focus:outline-none shadow-gray-300 shadow-md bg-white">
          <CiSearch className="text-xl ml-2" />
          <input
            className="ml-2 flex-1 border-none focus:outline-none bg-white text-sm p-2"
            type="text"
            placeholder="Search a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mt-2 justify-center min-h-screen">
        <div className="overflow-y-scroll p-5 border rounded-lg shadow-lg w-full max-w-6xl h-[400px] bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredData.map((item: any) => (
              <Link href={`/country?name=${item.name.common}`}
                key={item.name.common}
                className="flex items-center space-x-1 p-1"
              >
                <img
                  src={item.flags.png}
                  alt={item.name.common}
                  className="w-5 h-3"
                />
                <p className="text-sm truncate">{item.name.common}</p>
            </Link>
            ))}
        </div>
      </div>
    </div>
    </div >
  )
}

export default Page
