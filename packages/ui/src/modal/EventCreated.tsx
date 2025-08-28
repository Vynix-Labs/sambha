import { CalendarIcon, ConfitteIcon } from "../../../../apps/web/public/svg";
import { Button } from "../button";
import { Dispatch, SetStateAction } from "react";
type EventCreatedProps = {
  setIsCreated: Dispatch<SetStateAction<boolean>>;
};
function EventCreated({ setIsCreated }: EventCreatedProps) {
  const handleNavDashboard = () => {
    setIsCreated(false);
  };
  async function shareContent() {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Event",
          text: "Check out this amazing event!",
          url: "https://example.com/event/123",
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log("Web Share API not supported");
      // fallbackShare();
    }
  }

  return (
    <div className="  sm:w-[28rem] rounded-[1.25rem] space-y-[0.63rem] min-w-[calc(20rem-2rem)]">
      <div>
        <ConfitteIcon />
        <p className="text-primary-darkPurple text-2xl font-semibold text-center">
          Your event is ready!
        </p>
      </div>
      <div className="py-3 px-4 space-y-3 ">
        <div className="flex items-center gap-3 sm:flex-row flex-col">
          <div className="w-full max-w-[6.8rem] w-full h-[8.6rem] bg-red-400 rounded-lg ">
            <img
              src="../../../../apps/web/public/Images/oliver-emily.png"
              alt="cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-1 items-center justify-center sm:justify-start ">
              <div
                aria-hidden={true}
                className="bg-gradient-to-b to-[#3E80BA] from-[#7A4CFB] size-6 rounded-full"
              />
              <p className="text-sm font-normal text-primary-darkPurple">
                You are hosting
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-primary-darkPurple text-center sm:text-start">
                Oliver & Emily's Wedding
              </p>
              <p className="text-sm font-normal text-gray-base text-center sm:text-start">
                The Grand Hall, Rosewood Estate
              </p>
            </div>
          </div>
        </div>
        <hr className="border-collapse border border-[#E4E7EC]" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <CalendarIcon />
            <p className="text-sm font-normal txt-primary-darkPurple">
              Sat, Aug 20
            </p>
          </div>
          <div className="size-[5px] rounded-full bg-gray-base" />

          <p className="text-sm font-normal text-gray-base">6 To-Do</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center sm:flex-row w-full ">
        <Button
          variant="outline"
          size="md"
          onClick={shareContent}
          className={`  p-[0.5px] bg-gradient-primary bg-clip-border text-transparent  w-full`}
        >
          <div className="flex items-center gap-2 size-full bg-primary-light rounded-full px-6 py-[0.63rem]">
            <span className=" bg-clip-text text-transparent bg-gradient-primary text-center w-full">
              Share event
            </span>
          </div>
        </Button>
        <Button
          onClick={handleNavDashboard}
          className={`   px-6  w-full`}
          size="md"
        >
          <span> Go to dashboard</span>
        </Button>
      </div>
    </div>
  );
}

export default EventCreated;
