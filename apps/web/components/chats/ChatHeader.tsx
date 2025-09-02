"use client";

import React from "react";
import { useSetAtom } from "jotai";
import { modalAtom } from "../../store/modalAtom";
import Image from "next/image";
import { RxCheck } from "react-icons/rx";
import { User } from "../../types/events/data";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const ChatHeader = ({ user }: { user: User }) => {
  const setModal = useSetAtom(modalAtom);
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 pb-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => router.push("/event-planner/chats/")}
          className="md:hidden"
        >
          <IoIosArrowBack />
        </button>
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={() =>
            setModal({ isOpen: true, type: "chat profile", data: user })
          }
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="font-semibold text-base text-neutral-base truncate">
            {user.name}
          </p>
          {user?.verified && (
            <span className="ml-1 inline-flex items-center justify-center text-gray-light rounded-full text-xs font-medium bg-primary-violet">
              <RxCheck />
            </span>
          )}
        </div>
        {user.rate && <p className="text-primary-violet">{user.rate}</p>}
      </div>
    </div>
  );
};
