"use client";

import { getCountries } from "@/api/apis";
import React, { useEffect, useState } from "react";
import { CustomNav } from "@/components/CustomNav";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

function Page() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCountries();
    if (data != null) {
      setData(data);
    }
  };

  const filteredData = data.filter((item: any) =>
    item.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-[url(../../public/BackgroundMap.svg)] bg-cover bg-no-repeat opacity-50"
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative">
        <CustomNav />
        
        <div className="flex flex-col items-center">
          <div className="flex-row py-5">
            <img src="BrandTitle.svg" alt="Brand Title" />
          </div>

          <div className="inline-flex max-w-3xl items-center rounded-xl bg-white p-1 shadow-md shadow-gray-300 focus:outline-none">
            <CiSearch className="ml-2 text-xl" />
            <input
              className="ml-2 flex-1 border-none bg-white p-2 text-sm focus:outline-none"
              type="text"
              placeholder="Search a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2 flex min-h-screen justify-center">
          <div className="h-[400px] w-full max-w-6xl overflow-y-scroll rounded-lg border bg-white p-5 shadow-lg">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filteredData.map((item: any) => (
                <Link
                  href={`/country?name=${item.name.common}`}
                  key={item.name.common}
                  className="flex items-center space-x-1 p-1"
                >
                  <img
                    src={item.flags.png}
                    alt={item.name.common}
                    className="h-3 w-5"
                  />
                  <p className="truncate text-sm">{item.name.common}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
