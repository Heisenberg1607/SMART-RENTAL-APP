import { useRouter } from "next/navigation";
import { FaRegCopyright } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const router = useRouter();

  const links = [
    [
      { label: "Company", key: "header-1", path: "/" },
      { label: "About Us", key: "item-1-1", path: "AboutUs" },
      { label: "Contact Us", key: "item-1-2" },
      { label: "Pricing", key: "item-1-3" },
      { label: "Testimonials", key: "item-1-4" },
    ],
    [
      { label: "Support", key: "header-2" },
      { label: "Help Center", key: "item-2-1" },
      { label: "Terms Of Service", key: "item-2-2" },
      { label: "Privacy Policy", key: "item-2-3" },
    ],
  ];

  const handleLinkClick = (path) => {
    router.push(path);
  };

  return (
    <footer className="bg-gray-800 text-gray-200 tracking-wider">
      <div className="container mx-auto py-8 px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/Images/logo.png" alt="company logo" className="h-7" />
              <span className="text-lg font-bold ml-1">Smart Rental App</span>
            </div>
            <div className="text-[#cccccc] flex flex-col">
              <span>&copy; 2024 Smart Rental App.Co</span>
              <span>All Rights Reserved.</span>
            </div>
            <div className="flex gap-4">
              <FaInstagram />
              <FaLinkedin />
              <FaSquareXTwitter />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {links.map((col, index) => (
              <ul key={index}>
                {col.map((link) => (
                  <li key={link.key} className="mb-2">
                    <button
                      className="text-stone-300 hover:underline transition-all duration-300 hover:text-stone-100"
                      onClick={() => handleLinkClick(link.path)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Stay Up To Date
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              placeholder="Enter your email..."
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
