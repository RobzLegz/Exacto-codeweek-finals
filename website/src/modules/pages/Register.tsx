import React, { useEffect } from "react";
import PageModule from "../PageModule";
import { useStore } from "../../lib/store";
import Register from "../../components/admin/LoginForm";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();

  const { user } = useStore();

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  });

  return (
    <PageModule title="Register" description="register">
      <Register register />
    </PageModule>
  );
};

export default RegisterPage;
