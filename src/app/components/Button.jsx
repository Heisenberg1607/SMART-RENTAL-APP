import { useRouter } from "next/navigation";

function Button({ children, destination, type, onClick }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(destination);
  };

  return (
    <div>
      {type === "homepageButton" && (
        <button
          className="rounded-full bg-purple-600 p-3 mt-3 text-md font-semibold transition-all duration-300 hover:bg-purple-500 hover:text-stone-900 w-40 hover:w-44 text-stone-950"
          onClick={handleClick}
        >
          {children}
        </button>
      )}
      {type === "rentBorrowerButton" && (
        <button
          className="text-sm border-2 border-blue-200 bg-blue-500 rounded-full p-2 text-stone-800 font-semibold w-40 hover:w-48 transition-all duration-300 hover:text-stone-50"
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {type === "goBack" && (
        <button
          className="text-sm border-2 border-blue-200 bg-blue-500 rounded-3xl p-2 text-stone-900 font-semibold hover:w-36 transition-all duration-300 hover:text-stone-50 capitalize w-32 hover:bg-blue-600 hover:tracking-wider"
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  );
}

export default Button;
