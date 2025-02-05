"use client";
import DashboardFooter from "@/components/common/layouts/DashboardFooter";
import DashboardHeader from "@/components/common/layouts/DashboardHeader";
import DashboardMenu from "@/components/common/layouts/DashboardMenu";
import { metadatas } from "@/data/metadatas";
import { setUser } from "@/redux/slices/userSlice";
import { Layout, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Meta Data:
// export const metadata = { ...metadatas };

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (!authToken || !user) {
      message.warning("You need to log in to access this page.");
      router.push("/login");
    } else {
      console.log("main user", user);
      const parsedUser = JSON.parse(user);
      dispatch(setUser(parsedUser));
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {user ? (
        <>
          <DashboardMenu />
          <Layout>
            <DashboardHeader />
            <main>{children}</main>

            <DashboardFooter />
          </Layout>
        </>
      ) : (
        <Spin />
      )}
    </Layout>
  );
}
