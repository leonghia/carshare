import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router";
import { Notification } from "iconsax-react";
import userPfp from "../assets/images/user_pfp.webp";

export function Header(): React.JSX.Element {
  return (
    <header className="w-full px-16 pt-8 grid grid-cols-[repeat(3,max-content)] justify-between items-center">
      <figure>
        <img
          src={logo}
          alt="carshare logo"
          className="w-[158px] h-8 object-contain"
        />
      </figure>
      <nav className="w-[500px] flex items-center justify-between">
        <NavLink
          to="/book"
          end
          className="text-lg font-medium text-foreground-500 [&.active]:text-white"
        >
          Đặt xe
        </NavLink>
        <NavLink
          to="/rules"
          end
          className="text-lg font-medium text-foreground-500 [&.active]:text-white"
        >
          Quy định
        </NavLink>
        <NavLink
          to="/feedback"
          end
          className="text-lg font-medium text-foreground-500 [&.active]:text-white"
        >
          Phản ánh
        </NavLink>
      </nav>
      <div className="flex items-center gap-10">
        <button type="button" className="relative">
          <span className="absolute left-[18px] top-[2px] block size-3 rounded-full bg-danger-500 border-2 border-white"></span>
          <Notification variant="Bold" className="size-8 text-foreground-500" />
        </button>
        <button type="button">
          <img
            src={userPfp}
            alt="user profile picture"
            className="size-10 rounded-full border-2 border-primary-500 shadow-xl"
          />
        </button>
      </div>
    </header>
  );
}
