"use client";

import { useEffect, useState } from "react";
import { getCountryByName } from "@/api/apis";
import { useSearchParams } from "next/navigation";
import { Card } from "flowbite-react";
import BackNavTop from "@/components/BackNavTop";

// Define the Country interface
interface Country {
  flags: {
    png: string;
  };
  region: string;
  subregion: string;
  capital: string[];
  area: number;
  population: number;
  timezones: string[];
  languages: { [key: string]: string };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  latlng: [number, number];
}

function PageContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [countryData, setCountryData] = useState<Country[]>([]);

  const fetchData = async () => {
    if (name) {
      const data: Country[] = await getCountryByName(name); // Ensure API returns data matching the Country[] type
      setCountryData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  return (
    <div className="relative dark:text-white">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-[url(../../public/BackgroundMap.svg)] bg-cover bg-no-repeat opacity-50 dark:opacity-100 dark:bg-gray-600"
        aria-hidden="true"
      ></div>
      <div className="relative">
        <div className="p-2">
          <BackNavTop />
        </div>
        <div className="flex-col p-5">
          <h1 className="text-2xl font-bold">{name}</h1>

          <div className="mt-5 flex flex-wrap items-start gap-16">
            <img
              src={countryData[0]?.flags?.png}
              alt="flag"
              className="w-1/3 max-w-xs h-auto"
            />
            <Card className="grow p-5">
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h3 className="mr-2">Region:</h3>
                  <h4>{countryData[0]?.region}</h4>
                </div>
                <div className="flex items-center">
                  <h3 className="mr-2">Subregion:</h3>
                  <h4>{countryData[0]?.subregion}</h4>
                </div>
                <div className="flex items-center">
                  <h3 className="mr-2">Capital:</h3>
                  <h4>{countryData[0]?.capital?.join(", ")}</h4>
                </div>
                <div className="flex items-center">
                  <h3 className="mr-2">Area:</h3>
                  <h4>{countryData[0]?.area}</h4>
                </div>
                <div className="flex items-center">
                  <h3 className="mr-2">Population:</h3>
                  <h4>{countryData[0]?.population}</h4>
                </div>
                <div className="flex items-center">
                  <h3 className="mr-2">Timezones:</h3>
                  <h4>{countryData[0]?.timezones?.join(", ")}</h4>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap items-start gap-16">
            <div>
              <h2 className="mt-5 text-xl">Languages</h2>
              <Card className="mt-5">
                <ul>
                  {countryData[0]?.languages &&
                    Object.entries(countryData[0].languages).map(
                      ([code, language]) => <li key={code}>{language}</li>
                    )}
                </ul>
              </Card>
              <h2 className="mt-5 text-xl">Currency</h2>
              <Card className="mt-5">
                {countryData[0]?.currencies &&
                  Object.entries(countryData[0].currencies).map(
                    ([code, currency]) => (
                      <div key={code}>
                        <p>
                          <strong>{currency.name}</strong> ({currency.symbol})
                        </p>
                      </div>
                    )
                  )}
              </Card>
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="mt-5 text-xl">Geographical Location</h2>
              <iframe
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}&center=${countryData[0]?.latlng[0]},${countryData[0]?.latlng[1]}&zoom=5`}
                className="mt-5 p-5 w-full h-screen"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContent;