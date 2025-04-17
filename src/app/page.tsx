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

// Define the Country interface
interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  // Add other properties as needed
}

function Page() {
  // Explicitly type state variables
  const [data, setData] = useState<Country[]>([]);
  const [primaryData, setPrimaryData] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [warn, setWarn] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load sessionStorage only once, on mount
  useEffect(() => {
    const savedSearchTerm = sessionStorage.getItem("searchTerm");
    const savedFilter = sessionStorage.getItem("filter");
    const savedSelectedRegion = sessionStorage.getItem("selectedRegion");
    const savedLanguage = sessionStorage.getItem("language");

    if (savedSearchTerm !== null) setSearchTerm(savedSearchTerm);
    if (savedFilter !== null) setFilter(savedFilter);
    if (savedSelectedRegion !== null) setSelectedRegion(savedSelectedRegion);
    if (savedLanguage !== null) setLanguage(savedLanguage);

    // After loading all values, mark as hydrated
    setIsHydrated(true);

    // Default load all data first
    fetchData();

    // Then trigger specific filter logic if applicable
    if (savedFilter === "Language" && savedLanguage !== "") {
      getCountryByLanguage(savedLanguage || "").then((data) => {
        if (data != null) setData(data);
      });
    } else if (savedFilter === "Region" && savedSelectedRegion !== "") {
      getCountryByRegion(savedSelectedRegion || "").then((data) => {
        if (data != null) setData(data);
      });
    }
  }, []);

  // Sync state to sessionStorage ONLY after hydration
  useEffect(() => {
    if (!isHydrated) return;
    sessionStorage.setItem("searchTerm", searchTerm);
    sessionStorage.setItem("filter", filter);
    sessionStorage.setItem("selectedRegion", selectedRegion);
    sessionStorage.setItem("language", language);
  }, [searchTerm, filter, selectedRegion, language, isHydrated]);

  const fetchData = async () => {
    const data = await getCountries();
    if (data != null) {
      setData(data);
      setPrimaryData(data);
    }
  };

  // Filtered data based on search term
  const filteredData = data.filter((item: Country) =>
    item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilter = (filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setData(primaryData);
      setSelectedRegion("");
      setLanguage("");
    }
    if (filter === "Language") {
      setSelectedRegion("");
      setData(primaryData);
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

  return (
    <div className="relative dark:text-white ">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-[url(../../public/BackgroundMap.svg)] bg-cover bg-no-repeat opacity-50 dark:opacity-100 dark:bg-gray-600"
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative">
        <CustomNav />

        <div className="flex flex-col items-center">
          <div className="flex-row py-5">
            <img
              src="BrandTitle.svg"
              alt="Brand Title"
              className="block dark:hidden"
            />
            <img
              src="DarkMode_BrandTitle.svg"
              alt="Brand Title"
              className="hidden dark:block"
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <Dropdown
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div
                  className={`text-gray-600 mr-2 p-2 inline-flex rounded-xl shadow-md shadow-gray-300 focus:outline-none focus:ring-0 hover:cursor-default dark:text-white  ${
                    filter !== ""
                      ? "bg-gray-400 text-gray-800"
                      : "bg-white hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800"
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
                className={`inline-flex max-w-3xl items-center rounded-xl bg-white p-1 shadow-md shadow-gray-300 focus:outline-none dark:bg-gray-500 ${
                  warn ? "outline outline-red-500" : ""
                }`}
              >
                <CiSearch className="ml-2 text-xl" />
                <input
                  className="ml-2 flex-1 border-none bg-white p-2 text-sm focus:outline-none dark:bg-gray-500 "
                  type="text"
                  placeholder="Eg : English"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                />
                <Button
                  size="sm"
                  onClick={() => handleLanguageSearch()}
                  className="focus:ring-0 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  Search
                </Button>
              </div>
            ) : (
              <div className="inline-flex max-w-3xl items-center rounded-xl bg-white p-1 shadow-md shadow-gray-300 focus:outline-none dark:bg-gray-500">
                <CiSearch className="ml-2 text-xl" />
                <input
                  className="ml-2 flex-1 border-none bg-white p-2 text-sm focus:outline-none dark:bg-gray-500 "
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
                  selectedRegion === "Asia"
                    ? "bg-gray-500 text-white dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => handleRegionClick("Asia")}
              >
                Asia
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "America"
                    ? "bg-gray-500 text-white dark:bg-gray-700 "
                    : ""
                }`}
                onClick={() => handleRegionClick("America")}
              >
                America
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Africa"
                    ? "bg-gray-500 text-white dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => handleRegionClick("Africa")}
              >
                Africa
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Europe"
                    ? "bg-gray-500 text-white dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => handleRegionClick("Europe")}
              >
                Europe
              </Button>
              <Button
                color="alternative"
                className={`rounded-3xl shadow-md shadow-gray-300 focus:ring-0 hover:bg-gray-400 ${
                  selectedRegion === "Oceania"
                    ? "bg-gray-500 text-white dark:bg-gray-700"
                    : ""
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
          <div className="h-[400px] w-full max-w-6xl overflow-y-scroll rounded-lg border border-gray-400 bg-white p-5 shadow-lg dark:bg-gray-700">
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredData.map((item: Country) => (
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