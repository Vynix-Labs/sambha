import React from "react";
import { Users } from "lucide-react";

const GuestsTab: React.FC = () => {
  return (
    <div className="text-center text-gray-500 mt-12">
      <Users size={48} className="mx-auto mb-4 opacity-50" />
      <p>Manage guest assignments here</p>
    </div>
  );
};

export default GuestsTab;
