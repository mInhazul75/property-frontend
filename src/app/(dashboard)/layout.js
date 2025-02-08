"use client";
import DashboardFooter from "@/components/common/layouts/DashboardFooter";
import DashboardHeader from "@/components/common/layouts/DashboardHeader";
import DashboardMenu from "@/components/common/layouts/DashboardMenu";
import { setUser } from "@/redux/slices/userSlice";
import { Layout, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);



  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* {user ? (
        <> */}
          <DashboardMenu />
          <Layout>
            <DashboardHeader />
            <main>{children}</main>

            <DashboardFooter />
          </Layout>
        {/* </>
      ) : (
        <Spin />
      )} */}
    </Layout>
  );
}
