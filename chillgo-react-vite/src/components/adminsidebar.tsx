// AdminSidebar.tsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
// Remove lodash import as it's no longer needed
// import _ from 'lodash';
//import { useGetProfile } from "./data"; // Adjust the path based on your project structure

type AdminSidebarProps = {
  className: string;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  //   const navigate = useNavigate();
  //   const profile = useGetProfile();
  //   const user = profile.data?.detail.id;

  const navBar = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Khách hàng",
      link: "/admin/customer",
    },
  ];

  return (
    <div className={className}>
      <nav className="flex flex-col items-start justify-center h-full translate-y-1/2 space-y-8">
        {navBar.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `${
                isActive ? "text-white hover:bg-white" : "bg-white text-black"
              } 
              hover:no-underline font-bold text-base text-end pr-12 py-4 rounded-r-full border-t-[1px] border-b-[1px] border-r-[1px] w-full`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
      <div className="h-full pb-12 pl-12 flex items-end">
        <Link
          to="/logout"
          className="text-white text-base hover:no-underline hover:text-slate-300"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
