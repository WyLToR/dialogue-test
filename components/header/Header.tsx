"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { MenuContext } from "../contexts/MenuContext";
import Link from "next/link";

export const Header = () => {
  const { logged } = useContext(LoginContext);
  const { menu, setMenu } = useContext(MenuContext);
  const [theme, setTheme] = useState<string | null>(null);
  const [isClient, setClient] = useState(false);

  function handleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  useEffect(() => {
    setClient(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }, []);
  useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleMenu = () => setMenu(!menu);

  return (
    isClient && (
      <>
        {logged?.email && (
          <>
            <header
              className={`shadow-sm dark:bg-gray-900 pb-4 pt-4 ${
                theme === "dark" ? "dark" : ""
              }`}
            >
              <div className="ml-6 mr-6 max-w-full flex justify-between items-center">
                {logged && (
                  <>
                    <button
                      onClick={() => handleMenu()}
                      className="flex items-center gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                      </svg>
                      <span className="text-2xl whitespace-nowrap">
                        my-cms Admin
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button className={`fill-gray-500`} onClick={handleTheme}>
                        {theme === "light" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                          </svg>
                        )}
                      </button>
                      <Link href={{ pathname: "/admin" }} className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="https://placehold.co/600x600"
                            width={35}
                            height={35}
                            alt="your image"
                            className="rounded-full"
                          />
                          <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full"></div>
                        </div>
                        {logged.firstName}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </header>
          </>
        )}
      </>
    )
  );
};
