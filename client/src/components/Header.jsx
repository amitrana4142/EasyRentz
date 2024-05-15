import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {

  deleteUserFailure,

  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
  
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const [isOpen, setIsOpen] = useState(false);


  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in')
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  return (
    <header className="bg-RoyalPurple-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-200">Easy</span>
            <span className="text-white">Rentz</span>
          </h1>
        </Link>
        {currentUser ?
        <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
          :''}
        <ul className="flex gap-10">
          <Link to="/">
            <li className="hidden sm:inline text-slate-100 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-100 hover:underline">
              About
            </li>
          </Link>
          {/* <Link to="/profile"> */}
          {currentUser ? (
            // <img
            //   className='rounded-full h-7 w-7 object-cover'
            //   src={currentUser.avatar}
            //   alt='profile'
            // />
            <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isOpen}
              onClick={handleMouseEnter}
              title="Manage Profile and Listings"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            {isOpen && (
              <div
                className="absolute z-50 my-3 -right-14 text-base bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                onMouseLeave={handleMouseLeave}

              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {currentUser?.username}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {currentUser?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                 
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/create-listing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Create Listing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/showListing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                   

                      Show Listing
                    </a>
                    
                  </li>
                  <li>
                    <span
                     onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          ) : (
            <Link to={'/sign-in'}>
            <li className="hidden sm:inline text-slate-100 hover:underline"> Sign in</li>
            </Link>
          )}
          {/* </Link> */}
        </ul>
      </div>
    </header>
  );
}
