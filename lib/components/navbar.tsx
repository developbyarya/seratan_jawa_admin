import type { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="flex px-12 justify-between items-center h-16 bg-black">
      <h1 className="text-white">Admin Site</h1>
      <button className="text-white">Logout</button>
    </nav>
  );
};

export default Navbar;
