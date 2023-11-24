import React, { useEffect, useState } from "react";
import PageModule from "../PageModule";
import { useRouter } from "next/router";
import { useStore } from "../../lib/store";
import axios from "axios";
import AdminContainer from "../../components/admin/AdminContainer";

const Admin = () => {
  const router = useRouter();
  const { user, setUser } = useStore();

  const checkAuth = async () => {
    if (!user || user.role < 1) {
      try {
        const resp = await axios.get("/api/user");
        console.log(resp);
        setUser(resp.data.user);
      } catch (err) {
        console.log(err);
        router.replace("/");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (!user) {
    return (
      <PageModule title="Exacto" description="Exacto">
        <p></p>
      </PageModule>
    );
  }

  return (
    <PageModule title="Exacto Admin" description="Exacto admin">
      <AdminContainer />
    </PageModule>
  );
};

export default Admin;
