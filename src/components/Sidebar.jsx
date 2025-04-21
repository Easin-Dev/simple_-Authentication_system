import { Contact, MapPinned, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = ({ role }) => {

    const patheName = usePathname();
    const path = patheName.split("/")[2];

    const menuItems = role === "admin" ? [
        { id: 1, icon: <Contact />, name: "Users", link: "/admin-dashboard/users", slug: "users" },
    ] : [
        { id: 1, icon: <UserCircle />, name: "Personal Information", link: "/user-dashboard/personal-information", slug: "personal-information" },
        { id: 2, icon: <MapPinned />, name: "Address", link: "/user-dashboard/address", slug: "address" },
    ];

    return (
        <div className='p-4 shadow-md rounded-2xl w-2/3 mx-auto'>
            <ul className="flex flex-col gap-4 mt-4">
                {menuItems.map((item, index) => (
                    <li key={index} className="text-lg font-medium">
                        <Link
                            href={item.link}
                            className={`flex items-center gap-3 h-12 pl-4 transition duration-300 
                                ${path === item.slug
                                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                                    : "text-gray-600 border-l-4 border-transparent hover:text-blue-500 hover:bg-blue-50"}`}
                        >
                            {item.icon}{item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
