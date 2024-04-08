import { UserAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function ProtectedRoute({ children }) {
  const { isAuthenticated } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/Login");
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
