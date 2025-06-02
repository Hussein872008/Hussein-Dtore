import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdEmail, MdOutlineSupportAgent } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Footer = () => {
  const [hoveredShop, setHoveredShop] = useState(null);
  const [hoveredHelp, setHoveredHelp] = useState(null);
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const renderLinks = (items, hovered, setHovered) => {
    return items.map(({ to, label }, index) => {
      const isHovered = hovered === index;
      const isOtherHovered = hovered !== null && !isHovered;

      let baseColor = darkMode ? 'text-[#A5A1A4]' : 'text-[#6B7280]';
      let hoverColor = darkMode ? 'hover:text-[#C2B823]' : 'hover:text-[#4B5563]';
      let hoveredColor = darkMode ? 'text-[#DA2B50]' : 'text-[#9B2C2C]';
      let otherHoverColor = darkMode ? 'text-[#465542]' : 'text-[#D1D5DB]';

      return (
        <li key={index}>
          <Link
            to={to}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`text-sm transition-colors ${isHovered ? hoveredColor : isOtherHovered ? otherHoverColor : baseColor
              } ${hoverColor}`}
          >
            {label}
          </Link>
        </li>
      );
    });
  };

  const shopLinks = [
    { to: '#', label: 'New Arrivals' },
    { to: '#', label: 'Best Sellers' },
    { to: '#', label: 'Discounts' },
    { to: '#', label: 'Gift Cards' },
  ];

  const helpLinks = [
    { to: '#', label: 'FAQs' },
    { to: '#', label: 'Shipping' },
    { to: '#', label: 'Returns' },
    { to: '#', label: 'Size Guide' },
  ];

  const companyLinks = [
    { to: '#about', label: 'About Us' },
    { to: '#', label: 'Careers' },
    { to: '#', label: 'Blog' },
    { to: '#', label: 'Press' },
  ];

  return (
    <footer
      className={`${darkMode ? 'bg-[#1A1A1A] border-t border-[#3D3D3D]' : 'bg-[#2a3328] border-t border-[#C2B823]'
        } text-[#F5F2F4] pt-12 pb-6 px-6 md:px-12 lg:px-24`}
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-2xl font-bold">Hussein's Shop</span>
            </Link>
            <p className={`${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'} text-sm leading-relaxed`}>
              Your premier destination for quality products and exceptional service since 2010.
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-start gap-3">
                <span className="mt-1">
                  <FaMapMarkerAlt className="text-[#C2B823]" />
                </span>
                <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'}`}>Skirinqash Talkha Eldakahlia</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1">
                  <FaPhone className="text-[#C2B823]" />
                </span>
                <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'}`}>+20 107 033 4275</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1">
                  <MdEmail className="text-[#C2B823]" />
                </span>
                <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'}`}>husseinabdalla424@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1">
                  <MdOutlineSupportAgent className="text-[#C2B823]" />
                </span>
                <span className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'}`}>24/7 Customer Support</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-[#465542]'} pb-2`}>Shop</h3>
            <ul className="space-y-2">
              {renderLinks(shopLinks, hoveredShop, setHoveredShop)}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-[#465542]'} pb-2`}>Help</h3>
            <ul className="space-y-2">
              {renderLinks(helpLinks, hoveredHelp, setHoveredHelp)}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold border-b ${darkMode ? 'border-[#3D3D3D]' : 'border-[#465542]'} pb-2`}>Company</h3>
            <ul className="space-y-2">
              {renderLinks(companyLinks, hoveredCompany, setHoveredCompany)}
            </ul>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-[#3D3D3D]' : 'border-[#465542]'} pt-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${darkMode ? 'text-[#A5A1A4]' : 'text-[#D1D5DB]'} text-center md:text-left`}>
              &copy; {new Date().getFullYear()} Hussein's Shop. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link to="#" className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823]' : 'text-[#D1D5DB] hover:text-[#4B5563]'} transition-colors`}>
                Privacy Policy
              </Link>
              <Link to="#" className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823]' : 'text-[#D1D5DB] hover:text-[#4B5563]'} transition-colors`}>
                Terms of Service
              </Link>
              <Link to="#" className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823]' : 'text-[#D1D5DB] hover:text-[#4B5563]'} transition-colors`}>
                Cookie Policy
              </Link>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a
                href="https://www.facebook.com/husseinabdalla010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823] hover:bg-[#3D3D3D]' : 'text-[#D1D5DB] hover:text-[#4B5563] hover:bg-[#E5E7EB]'} transition-colors text-lg p-2 rounded-full`}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/Hussein99432152"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823] hover:bg-[#3D3D3D]' : 'text-[#D1D5DB] hover:text-[#4B5563] hover:bg-[#E5E7EB]'} transition-colors text-lg p-2 rounded-full`}
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/husseinabdalla010/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823] hover:bg-[#3D3D3D]' : 'text-[#D1D5DB] hover:text-[#4B5563] hover:bg-[#E5E7EB]'} transition-colors text-lg p-2 rounded-full`}
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/hussein-abdalla-hussein"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823] hover:bg-[#3D3D3D]' : 'text-[#D1D5DB] hover:text-[#4B5563] hover:bg-[#E5E7EB]'} transition-colors text-lg p-2 rounded-full`}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Hussein872008"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${darkMode ? 'text-[#A5A1A4] hover:text-[#C2B823] hover:bg-[#3D3D3D]' : 'text-[#D1D5DB] hover:text-[#4B5563] hover:bg-[#E5E7EB]'} transition-colors text-lg p-2 rounded-full`}
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;