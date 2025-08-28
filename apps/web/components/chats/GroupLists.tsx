"use client";

import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { groupsAtom } from "../../store/chatAtoms";
import Image from "next/image";
import { modalAtom } from "../../store/modalAtom";

export const GroupLists = () => {
  const [groups] = useAtom(groupsAtom);
  const setModal = useSetAtom(modalAtom);

  if (groups.length === 0) {
    return <p className="text-sm text-gray-500">No groups created yet.</p>;
  }

  const sortedGroups = [...groups].sort((a, b) => {
    const dateA = new Date(a.dateCreated || "").getTime();
    const dateB = new Date(b.dateCreated || "").getTime();
    return dateB - dateA;
  });

  console.log(groups);

  return (
    <div className="space-y-4">
      {sortedGroups.map((group) => (
        <div
          key={group.id}
          onClick={() =>
            setModal({ isOpen: true, data: group, type: "chat profile" })
          }
          className="flex items-center cursor-pointer justify-between border p-3 rounded-2xl"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={group.image}
              alt={group.name}
              width={40}
              height={40}
              className="rounded-full size-12 object-cover"
            />
            <div>
              <p className="font-medium text-neutral-base">{group.name}</p>
              <p className="text-sm text-gray-500">
                {group.membersTotal ?? 0} members
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
