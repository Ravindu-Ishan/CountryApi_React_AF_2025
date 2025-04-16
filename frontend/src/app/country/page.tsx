"use client";

import { useEffect, useState } from "react";
import { getCountryByName } from "@/api/apis";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [countryData, setCountryData] = useState([]);

  const fetchData = async () => {
    if (name) {
      const data = await getCountryByName(name);
      setCountryData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-col m-5">
      <h1 className="text-2xl font-bold">{name}</h1>

      <div className="mt-5 flex flex-wrap items-start gap-16">
        <img
          src={countryData[0]?.flags?.png}
          alt="flag"
          className="w-1/3 max-w-xs h-auto"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <h3 className="mr-2">Region:</h3>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2">Subregion:</h3>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2">Capital:</h3>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2">Area:</h3>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2">Population:</h3>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2">Timezones:</h3>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <h4>{countryData[0]?.region}</h4>
          </div>
          <div className="flex items-center">
            <h4>{countryData[0]?.subregion}</h4>
          </div>
          <div className="flex items-center">
            <h4>{countryData[0]?.capital}</h4>
          </div>
          <div className="flex items-center">
            <h4>{countryData[0]?.area}</h4>
          </div>
          <div className="flex items-center">
            <h4>{countryData[0]?.population}</h4>
          </div>
          <div className="flex items-center">
            <h4>{countryData[0]?.timezones}</h4>
          </div>
        </div>
      </div>

      <h2 className="mt-5 text-xl">Languages</h2>
      <div>
        <ul>
          {countryData[0]?.languages &&
            Object.entries(countryData[0].languages).map(([code, language]) => (
              <li key={code}>{language}</li>
            ))}
        </ul>
      </div>

      <h2 className="mt-5 text-xl">Currency</h2>
      <div className="mt-5">
        {countryData[0]?.currencies &&
          Object.entries(countryData[0].currencies).map(([code, currency]) => (
            <div key={code}>
              <p>
                <strong>{currency.name}</strong> ({currency.symbol})
              </p>
            </div>
          ))}
      </div>

      <h2 className="mt-5 text-xl">Geographical Location</h2>
      <iframe
        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}&center=${countryData[0]?.latlng[0]},${countryData[0]?.latlng[1]}&zoom=5`}
        className="mt-5 w-full"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export default Page;
