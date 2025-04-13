import { Navbar } from "flowbite-react";

export function CustomNav() {
  return (
    <Navbar fluid rounded className="max-w-full">
      <div className="w-full flex justify-end">
        <a href="#" className="text-sm text-blue-600 hover:underline mt-2 mr-2">
          Signup
        </a>
      </div>
    </Navbar>
  );
}
