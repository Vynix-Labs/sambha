import { Dispatch, SetStateAction } from "react";
type Props = {
  tabs: string[];
  isActive: string;
  setIsActive: Dispatch<SetStateAction<string>>;
};
function Tab({ tabs, isActive, setIsActive }: Props) {
  return (
    <div className="space-x-3">
      {tabs.map((tab, index) => {
        const active = tab.toLowerCase() === isActive?.toLowerCase();
        return (
          <button
            onClick={() => setIsActive(tab)}
            className={`${active ? "bg-gradient-primary text-primary-light" : "bg-white-base text-gray-600 hover:bg-gray-600/20"} rounded-full text-sm sm:text-base font-semibold py-2 sm:py-2 px-4 sm:px-6 transition ease-in-out duration-900`}
            key={index}
          >
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Tab;
