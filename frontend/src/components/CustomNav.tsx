import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { ToggleSwitch } from "flowbite-react";

export function CustomNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Navbar
      fluid
      rounded
      className="max-w-full bg-transparent dark:bg-transparent"
    >
      <div className="flex w-full justify-end">
        <a href="#" className="text-md mt-2 mr-2 text-black hover:underline">
          Signup
        </a>
      </div>
      <ToggleSwitch checked={isDarkMode} label="Toggle me" onChange={setIsDarkMode} />
    </Navbar>
  );
}
