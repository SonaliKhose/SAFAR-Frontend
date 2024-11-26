import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({ links = [] }) => {
  const router = useRouter(); // Get current route to highlight active link

  return (
    // <nav className="flex justify-center mt-4">
    <div className="mb-4 ">
      <ol className="flex items-center space-x-2 p-2 bg-white rounded-md border border-white-300 shadow-sm">
        {links.length > 0 ? (
          links.map((link, index) => {
            const isActive = router.pathname === link.href;

            return (
              <li
                key={index}
                className={`flex items-center ${
                  index !== links.length - 1 ? "mr-2" : ""
                }`}
              >
                <Link href={link.href} legacyBehavior>
                  <a
                    className={`flex items-center px-4 py-2 font-medium rounded-full transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-500 text-white" // Active step
                        : "bg-gray-200 text-gray-600" // Inactive steps
                    }`}
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full border border-gray-300 mr-2">
                      {index + 1}
                    </span>
                    {link.label}
                  </a>
                </Link>
                {index !== links.length - 1 && (
                  <span className="flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                )}
              </li>
            );
          })
        ) : (
          <li>No breadcrumb links available</li>
        )}
      </ol>
    </div>

    // </nav>
  );
};

export default Breadcrumb;
