// /utils/withAdminAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const withAdminAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.replace("/admin/sign-in"); // redirect to login if no token
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminAuth;
