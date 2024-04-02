import { useRouter } from "next/navigation";

function Button({ children, destination }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(destination);
  };

  return (
    <div>
      <button
        className="rounded-full bg-purple-600 p-3 mt-3 text-md font-semibold transition-all duration-300 hover:bg-purple-500 hover:text-stone-900 w-40 hover:w-44 text-stone-950"
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
