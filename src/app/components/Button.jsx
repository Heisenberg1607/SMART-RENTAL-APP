import { useRouter } from "next/navigation";

function Button({ children, destination }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(destination);
  };

  return (
    <div>
      <button className="get-started-btn" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
