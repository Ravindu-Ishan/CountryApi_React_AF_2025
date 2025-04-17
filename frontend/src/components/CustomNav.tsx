import { Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { ToggleSwitch } from "flowbite-react";

export function CustomNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("flowbite-theme-mode");
    setIsDarkMode(mode === "dark");
  }, []);

  const handleToggle = () => {
    const newMode = isDarkMode ? "light" : "dark";
    localStorage.setItem("flowbite-theme-mode", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
    setIsDarkMode(newMode === "dark");
  };

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
      <div className="flex items-center justify-between w-full">
        <div className="flex">
          <ToggleSwitch
            checked={isDarkMode}
            label="Theme"
            onChange={handleToggle}
            color="dark"
            className="focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex">
          <a href="#" className="text-md mt-2 mr-2 text-black hover:underline dark:text-white">
            Welcome to NationInfo
          </a>
        </div>
      </div>
    </Navbar>
  );
}