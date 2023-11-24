import React, { useEffect } from "react";
import PageModule from "../PageModule";
import { useStore } from "../../lib/store";
import Login from "../../components/admin/LoginForm";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const { user } = useStore();

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  });

  return (
    <PageModule title="Login" description="login">
      <Login register={false} />
    </PageModule>
  );
};

export default LoginPage;
