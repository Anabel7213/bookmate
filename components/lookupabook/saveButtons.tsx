import { BookOpenCheck, NotebookPen, SaveIcon } from "lucide-react";

export default function SaveButtons({setOpenFreeForm, setShowQuestionnaire}: any) {
  return (
    <>
      <div className="flex pb-4 items-center">
        <div className="border-b border-brown w-full h-[2px]"></div>
        <div className="flex gap-4 items-center">
          <button
            className="rounded-full text-brown w-[48px] h-[48px] whitespace-nowrap border p-4 border-brown flex items-center justify-center hover:bg-brown/10 cursor-pointer transition-all"
            onClick={() => {
              setOpenFreeForm(true);
              setShowQuestionnaire(false);
            }}
          >
            <div className="text-brown">
              <NotebookPen strokeWidth={1.2} />
            </div>
          </button>
          <button
            type="submit"
            form="booklookup"
            className="rounded-full w-[64px] h-[64px] whitespace-nowrap border border-brown flex items-center justify-center p-4 hover:bg-brown/10 cursor-pointer transition-all"
          >
            <div className="text-brown">
              <SaveIcon size={32} strokeWidth={1} />
            </div>
          </button>
          <button
            className="rounded-full w-[48px] h-[48px] p-4 whitespace-nowrap border border-brown flex items-center justify-center hover:bg-brown/10 cursor-pointer transition-all"
            onClick={() => {
              setShowQuestionnaire(true);
              setOpenFreeForm(false);
            }}
          >
            <div className="text-brown">
              <BookOpenCheck strokeWidth={1.2} />
            </div>
          </button>
        </div>
        <div className="border-b border-brown w-full h-[2px]"></div>
      </div>
    </>
  );
}
