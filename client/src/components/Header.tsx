import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router";
import { Notification, HambergerMenu } from "iconsax-react";
import userPfp from "../assets/images/user_pfp.webp";

export function Header(): React.JSX.Element {
  return (
    <header className="relative z-10 w-full px-16 xl:px-12 lg:px-8 md:px-6 sm:px-4 pt-8 lg:pt-6 md:pt-5 sm:pt-4 grid grid-cols-[repeat(3,max-content)] lg:grid-cols-[repeat(2,max-content)] justify-between items-center">
      <div className="flex items-center gap-4 sm:gap-2">
        <button type="button">
          <HambergerMenu
            variant="Bold"
            className="hidden lg:block size-8 sm:size-6 text-foreground-500"
          />
        </button>
        <figure>
          <img
            src={logo}
            alt="carshare logo"
            className="w-[158px] lg:w-[118px] sm:w-[98px] h-8 lg:h-6 sm:h-5 object-contain"
          />
        </figure>
      </div>
      <nav className="lg:hidden w-[500px] xl:w-[450px] flex items-center justify-between">
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
      <div className="flex items-center gap-10 sm:gap-5">
        <button type="button" className="relative">
          <span className="absolute left-[18px] sm:left-[14px] top-[2px] block size-3 sm:size-2 rounded-full bg-danger-500 border-2 sm:border border-white"></span>
          <Notification
            variant="Bold"
            className="size-8 sm:size-6 text-foreground-500"
          />
        </button>
        <button type="button">
          <img
            src={userPfp}
            alt="user profile picture"
            className="size-10 sm:size-[28px] rounded-full border-2 sm:border border-primary-500 shadow-xl sm:shadow-md"
          />
        </button>
      </div>
    </header>
  );
}
