"use client";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="grid grid-cols-5 gap-4 p-14">
      <div className="col-span-2 w-full mx-auto items-center flex flex-col gap-4">
        <h1 className="text-2xl font-medium">My profile</h1>
        <Sidebar role={session?.role} />
      </div>
      <div className="col-span-3 p-20">
        {children}</div>
    </div>
  );
}
