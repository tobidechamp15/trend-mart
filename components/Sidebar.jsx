import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faHome,
  faShoppingBag,
  faInfoCircle,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} aria-label="Close Sidebar">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-white text-2xl hover:text-gray-400 transition duration-300"
          />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-6 mt-10 px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg hover:text-gray-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          <span>Home</span>
        </Link>
        <Link
          href="/shop"
          className="flex items-center gap-3 text-lg hover:text-gray-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
          <span>Shop</span>
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-3 text-lg hover:text-gray-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
          <span>About</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-3 text-lg hover:text-gray-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          <span>Contact</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 text-lg hover:text-gray-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
