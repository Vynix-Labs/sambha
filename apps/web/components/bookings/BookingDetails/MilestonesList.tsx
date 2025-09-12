// components/MilestonesList.tsx
"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export type Milestone = {
  id: number;
  title: string;
  description?: string;
  date?: string;
  completed?: boolean;
};

type MilestonesListProps = {
  milestones: Milestone[];
};

const MilestonesList: React.FC<MilestonesListProps> = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No milestones have been added yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="mt-1">
            {milestone.completed ? (
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#2A1D52]">
              {milestone.title}
            </h3>
            {milestone.description && (
              <p className="text-sm text-gray-600">{milestone.description}</p>
            )}
            {milestone.date && (
              <p className="text-xs text-gray-400 mt-1">{milestone.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestonesList;
