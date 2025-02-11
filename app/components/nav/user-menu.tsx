"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import BackDrop from "./back-drop";
import { SafeUser } from "@/types";
import { User } from "lucide-react";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <User className="h-6 w-6 text-slate-800" />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                {currentUser.role === "ADMIN" ? (
                  <div>
                    <Link href="/orders">
                      <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                    </Link>
                    <Link href="/admin">
                      <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link href="/orders">
                      <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                    </Link>
                  </div>
                )}
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
