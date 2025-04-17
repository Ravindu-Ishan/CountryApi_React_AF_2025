"use client";

import {
  getCountries,
  getCountryByRegion,
  getCountryByLanguage,
} from "@/api/apis";
import React, { useEffect, useState } from "react";
import { CustomNav } from "@/components/CustomNav";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { LuFilter } from "react-icons/lu";

function Page() {
  const [data, setData] = useState([]);
  const [primaryData, setPrimaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filter, setFilter] = useState("");
  const [language, setLanguage] = useState("");
  const [warn, setWarn] = useState(false);

  const fetchData = async () => {
    const data = await getCountries();
    if (data != null) {
      setData(data);
      setPrimaryData(data);
    }
  };

  const filteredData = data.filter((item: any) =>
    item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setData(primaryData);
      setSelectedRegion("");
      setLanguage("");
    }
  };

  const handleLanguageSearch = async () => {
    if (language !== "") {
      const data = await getCountryByLanguage(language);
      setWarn(false);
      if (data != null) {
        setData(data);
      } else {
        setData([]);
      }
    } else {
      setWarn(true);
    }
  };

  const handleRegionClick = async (region: string) => {
    setSelectedRegion(region);
    const data = await getCountryByRegion(region);
    if (data != null) {
      setData(data);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className="flex w-full items-center justify-center">
            <Dropdown
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div
                  className={`text-gray-600 mr-2 p-2 inline-flex rounded-xl shadow-md shadow-gray-300 focus:outline-none focus:ring-0 hover:cursor-default ${
                    filter !== ""
                      ? "bg-gray-400 text-gray-800"
                      : "bg-white hover:bg-gray-400"
                  }`}
                >
                  <LuFilter className=" mt-1.5" /> Filter
                </div>
              )}
            >
              <DropdownItem className="" onClick={() => handleFilter("Region")}>
                Region
              </DropdownItem>
              <DropdownItem
                className=""
                onClick={() => handleFilter("Language")}
              >
                Language
              </DropdownItem>
              <DropdownItem className="" onClick={() => handleFilter("")}>
                None
              </DropdownItem>
            </Dropdown>
            {filter === "Language" ? (
              <div
                className={`inline-flex max-w-3xl items-center rounded-xl bg-white p-1 shadow-md shadow-gray-300 focus:outline-none ${
                  warn ? "outline outline-red-500" : ""
                }`}
              >
                <CiSearch className="ml-2 text-xl" />
                <input
                  className="ml-2 flex-1 border-none bg-white p-2 text-sm focus:outline-none "
                  type="text"
                  placeholder="Eg : English"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                />
                <Button
                  size="sm"
                  onClick={(e) => handleLanguageSearch()}
                  className="focus:ring-0"
                >
                  Search
                </Button>
              </div>
            ) : (
              <div className="inline-flex max-w-3xl items-center rounded-xl bg-white p-1 shadow-md shadow-gray-300 focus:outline-none">
                <CiSearch className="ml-2 text-xl" />
                <input
                  className="ml-2 flex-1 border-none bg-white p-2 text-sm focus:outline-none "
                  type="text"
                  placeholder="Search a country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
          {filter === "Region" ? (
            <div className="mt-2 inline-flex max-w-full items-center gap-2">
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Asia" ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => handleRegionClick("Asia")}
              >
                Asia
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "America" ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => handleRegionClick("America")}
              >
                America
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Africa" ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => handleRegionClick("Africa")}
              >
                Africa
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Europe" ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => handleRegionClick("Europe")}
              >
                Europe
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Oceania" ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => handleRegionClick("Oceania")}
              >
                Oceania
              </Button>
            </div>
          ) : (
            <div className="mt-12 inline-flex max-w-full items-center gap-2"></div>
          )}
        </div>

        <div className="mt-2 flex min-h-screen justify-center">
          <div className="h-[400px] w-full max-w-6xl overflow-y-scroll rounded-lg border border-gray-400 bg-white p-5 shadow-lg">
            {filteredData.length > 0 ? (
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
            ) : (
              <div className="text-center text-gray-500">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
