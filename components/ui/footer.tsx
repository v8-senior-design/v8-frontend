import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-6 mt-10"
      style={{ backgroundColor: "#101827" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">V8</h2>
        </div>
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; V8 2024</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 2a4.48 4.48 0 00-4.47 4.49c0 .35.04.7.11 1.03A12.94 12.94 0 013 4.03s-4 9 5 13.25c-1.93.53-4.12.2-6.1-1.23C8 22 14 20 16 14.75A12.34 12.34 0 0023 3z"
              />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 2h4v4h-4v4h4v4h-4v4h-4v-4H8v4H4v-4H0v-4h4V6H0V2h4V0h4v4h4V0h4v4z"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.945 4.055A10.9 10.9 0 0112 12a10.9 10.9 0 01-8.945-7.945C.683 7.487.684 16.513 12 22c10.316-5.487 10.317-14.513 8.945-17.945z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
