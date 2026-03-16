import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">{APP_CONFIG.NAME}</h3>
            <p className="text-gray-400 mb-4">{APP_CONFIG.TAGLINE}</p>
            <div className="flex space-x-4">
              <button type="button" className="hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </button>
              <button type="button" className="hover:text-white transition-colors" aria-label="GitHub">
                <FaGithub className="w-5 h-5" />
              </button>
              <button type="button" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={ROUTES.DASHBOARD} className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={ROUTES.HOST} className="hover:text-white transition-colors">
                  Host Session
                </Link>
              </li>
              <li>
                <Link to={ROUTES.JOIN} className="hover:text-white transition-colors">
                  Join Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TERMS} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {APP_CONFIG.NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
