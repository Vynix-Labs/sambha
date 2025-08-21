import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sambha/ui/dropdown-menu";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { FaUserGroup } from "react-icons/fa6";
import { useSetAtom } from "jotai";
import { modalAtom } from "../../store/modalAtom";

export const ChatMenuDropdown = () => {
  const setModal = useSetAtom(modalAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <HiPlus />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white-main space-y-2">
        <DropdownMenuItem
          className="hover:bg-neutral-100 outline-none"
          onClick={() => setModal({ isOpen: true, type: "new group" })}
        >
          <FaUserGroup className="text-primary-violet" /> <span>New Group</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-neutral-100 outline-none"
          onClick={() => setModal({ isOpen: true, type: "view group" })}
        >
          <FaUserGroup className="text-primary-violet" /> <span>Groups</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
