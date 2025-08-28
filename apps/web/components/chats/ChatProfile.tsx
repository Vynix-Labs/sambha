import { useAtom } from "jotai";
import React from "react";
import { modalAtom } from "../../store/modalAtom";
import Image from "next/image";
import { Switch } from "@sambha/ui/switch";
import { RxCheck } from "react-icons/rx";
import { User } from "../../types/events/data";
import { BsDot } from "react-icons/bs";
import { formatFlexibleDate } from "../../utils/formatMessageDate";

export const ChatProfile = () => {
  const [modal] = useAtom(modalAtom);
  const user = modal.data as User;

  return (
    <div className="">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full w-24 h-24"
        />
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
        {user.category === "vendor" ? (
          <p className="text-primary-violet text-sm">
            From {user.serviceCharge}
          </p>
        ) : user.category === "event" ? (
          <p className="flex items-center text-grey-base text-sm">
            <span className="text-primary-violet">
              {formatFlexibleDate(user.eventDate ?? "", {
                formatStyle: "weekday",
              })}
            </span>

            <BsDot />
            <span>{user.eventTodo} todo</span>
          </p>
        ) : (
          user.category === "host" && (
            <p className="text-grey-base text-sm">
              Created{" "}
              {formatFlexibleDate(user.dateCreated ?? "", {
                formatStyle: "short",
              })}
            </p>
          )
        )}
        {user.category !== "host" ? (
          <button className="rounded-[16px] cursor-pointer bg-neutral-100 py-2 w-full mt-2">
            {user.category === "event" ? "View event" : "View service"}
          </button>
        ) : (
          <div className="flex justify-between items-center gap-4 w-full">
            <button className="rounded-[16px] cursor-pointer bg-neutral-100 py-2 w-full mt-2">
              Edit group
            </button>
            <button className="rounded-[16px] cursor-pointer bg-neutral-100 py-2 w-full mt-2">
              Add member
            </button>
          </div>
        )}

        <div className="flex items-center justify-between w-full mt-2">
          <p>Mute notifications</p>
          <Switch className="bg-white" defaultChecked />
        </div>
        <p className="text-error-dark self-start">Report listing</p>
      </div>
      {user.category !== "vendor" && (
        <div className="w-full mt-4">
          <div className="flex items-center justify-between border-b pb-1 text-sm text-grey-base">
            <p>Members</p>
            <p>{user.membersTotal}</p>
          </div>
          {user.members &&
            user.members.map((member, id) => (
              <div className="flex mt-2 items-center space-x-2" key={id}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={20}
                  height={20}
                  className="rounded-full w-8"
                />
                <p className="text-sm">{member.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
