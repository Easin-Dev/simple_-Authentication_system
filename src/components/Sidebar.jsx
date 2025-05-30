import { Contact, LogOut, MapPinned, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ role }) => {
  const patheName = usePathname();
  const path = patheName.split("/")[2];
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const menuItems =
    role === "admin"
      ? [
          {
            id: 1,
            icon: <Contact />,
            name: "Users",
            link: "/admin-dashboard/users",
            slug: "users",
          },
        ]
      : [
          {
            id: 1,
            icon: <UserCircle />,
            name: "Personal Information",
            link: "/user-dashboard/personal-information",
            slug: "personal-information",
          },
          {
            id: 2,
            icon: <MapPinned />,
            name: "Address",
            link: "/user-dashboard/address",
            slug: "address",
          },
          { id: 3, icon: <LogOut />, name: "Logout", action: handleLogout }, // Use `action` instead of `link`
        ];

  return (
    <div className="p-4 shadow-md rounded-2xl w-2/3 mx-auto">
      <ul className="flex flex-col gap-4 mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="text-lg font-medium">
            {item.link ? (
              <Link
                href={item.link}
                className={`flex items-center gap-3 h-12 pl-4 transition duration-300 
                                    ${
                                      path === item.slug
                                        ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                                        : "text-gray-600 border-l-4 border-transparent hover:text-blue-500 hover:bg-blue-50"
                                    }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ) : (
              <button
                onClick={item.action}
                className="flex items-center gap-3 h-12 pl-4 w-full text-left text-gray-600 border-l-4 border-transparent hover:text-blue-500 hover:bg-blue-50 transition duration-300 cursor-pointer"
              >
                {item.icon}
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
