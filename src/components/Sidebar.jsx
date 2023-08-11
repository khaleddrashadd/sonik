import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../assets';
import { useState } from 'react';
import { links } from '../assets/constants';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';

const NavLinks = ({ handleClick }) => {
  return (
    <ul className="list-none flex flex-col mt-6">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            onClick={handleClick && handleClick}
            to={link.to}
            className="my-6 flex justify-start items-center flex-row text-sm font-medium text-gray-400 hover:text-cyan-400"
          >
            <link.icon className="w-6 h-6 mr-2" />
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="md:flex hidden flex-col py-10 w-[150px] px-4 bg-[#2e071f] pt-8">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </nav>
      <div className="absolute md:hidden block top-4 right-3 z-10">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 text-white mr-2 p-1"
          />
        )}
      </div>
      <nav
        className={`absolute top-0 h-screen w-1/2 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </nav>
    </>
  );
};

export default Sidebar;
