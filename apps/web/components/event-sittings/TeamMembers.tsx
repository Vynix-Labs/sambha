// components/seating-chart/SeatItem.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import avatar from "../../assets/images/avatar.png";
import gradient from "../../assets/images/gradient.png";
import PlusIcon from "components/icons/PlusIcon";
import EditIcon from "components/icons/EditIcon";
import { TrashIcon } from "lucide-react";
import { ThemeConfig } from "types/theme";

interface Member {
  id: number;
  name: string;
  description: string;
  avatar: string | StaticImageData; // Properly typed for Next.js Image component
  role: string;
}

interface TeamMembersProps {
  theme: ThemeConfig;
}


function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center w-full md:w-auto justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-primary-darkPurple hover:bg-gray-300 text-sm font-medium transition"
    >
      <PlusIcon className="h-5 w-5" />
      {children ?? "Add Host"}
    </button>
  );
}

export default function TeamMembers({ theme }: TeamMembersProps) {
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Jenny Wilson (You)",
      description: "jenny@example.com",
      avatar: avatar,
      role: "Creator",
    },
    {
      id: 2,
      name: "Groom’s Name",
      description: "Hgroom’sname@email.com",
      avatar: gradient,
      role: "Manager",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newMember, setNewMember] = useState<Member>({
    id: 0,
    name: "",
    description: "",
    avatar,
    role: "",
  });

  // delete member function
  const deleteMember = (id: number) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // edit member function
  const editMember = (id: number) => {
    const member = teamMembers.find((m) => m.id === id);
    if (member) {
      setNewMember(member);
      setEditingId(id);
      setShowModal(true); // open modal on edit
    }
  };

  // Load team members from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("teamMembers");
    if (saved) {
      setTeamMembers(JSON.parse(saved));
    }
  }, []);

  // Save team members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }, [teamMembers]);

  // save member function
  const saveMember = () => {
    if (editingId) {
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === editingId ? { ...newMember } : m))
      );
      setEditingId(null);
    } else {
      setTeamMembers((prev) => [
        ...prev,
        { ...newMember, id: Date.now(), avatar },
      ]);
    }

    // Close modal and reset form
    setShowModal(false);
    setNewMember({ id: 0, name: "", description: "", avatar, role: "" });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="space-y-3 flex md:flex-row flex-col justify-between border-b py-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-primary-darkPurple">
            Hosts
          </h2>
          <p className="text-sm text-gray-base">
            Add event managers to see your event through.
          </p>
        </div>
        <AddButton
          onClick={() => {
            setEditingId(null); // make sure we're not editing
            setNewMember({
              id: 0,
              name: "",
              description: "",
              avatar,
              role: "",
            }); // reset form
            setShowModal(true); // open modal
          }}
        >
          Add Host
        </AddButton>
      </div>

      {teamMembers.map((member) => (
        <div key={member.id} className="space-y-3 flex justify-between">
          <div className="flex gap-x-4 items-center">
            <Image
              src={member.avatar}
              alt="Avatar"
              width={500}
              height={500}
              className="h-9 w-9 rounded-lg"
            />
            <div className="flex flex-col">
              <h2 className="text-sm md:text-lg font-semibold text-primary-darkPurple capitalize">
                {member.name}
              </h2>
              <p className="text-sm text-gray-base">{member.description}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <button className="text-primary-deepBlue font-medium capitalize text-sm md:text-base">
              {member.role}
            </button>

            <div className="flex gap-4">
              {/* edit */}
              <button
                onClick={() => editMember(member.id)}
                className="text-primary-deepBlue"
              >
                <EditIcon className="h-4 w-4" />
              </button>
              {/* delete */}
              <button onClick={() => deleteMember(member.id)}>
                <TrashIcon className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Form to Add or Edit Member */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3">
          <div className="bg-primary-light rounded-xl p-6 max-w-xl w-full space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-sm md:text-xl font-semibold text-primary-darkPurple">
                Team Members
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-500 font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-sm md:text-lg ">
                {editingId ? "Edit Member" : "Add Member"}
              </h3>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex gap-2 w-full">
                  <input
                    className="border px-3 py-2 rounded w-full capitalize focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] outline-none"
                    placeholder="Name"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                  />
                  <input
                    className="border px-3 py-2 rounded w-full focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] outline-none"
                    placeholder="Email"
                    value={newMember.description}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <input
                  className="border px-3 py-2 rounded capitalize focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] outline-none"
                  placeholder="Role"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                />

                <div className="pt-6 w-full md:w-auto text-sm md:text-base">
                  <AddButton onClick={saveMember}>Add Host</AddButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}