// Meta Data:
// export const metadata = { ...metadatas };
'use client'
import React from 'react'
import { Layout } from "antd";
import FooterLayout from '@/components/common/layouts/footer';
import HeaderLayout from '@/components/common/layouts/header';


export default function HomeLayout({ children }) {

	return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fefaf4" }}>
      <HeaderLayout />
      <main>{children}</main>
      <FooterLayout />
    </Layout>
  );


}
