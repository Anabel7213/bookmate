"use client";

import { useState } from "react";
import Questionnaire from "./questionnaire";
import { useSearch } from "@/lib/fetch";
import FreeForm from "./freeForm";
import { dropdownItems } from "@/dataPoints";
import BookDetails from "./bookDetails";
import BookAutoPulledUpInfo, { BookDescription } from "./bookInfo";
import SaveButtons from "./saveButtons";
import SubmitBookData from "@/handleSubmission";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface ActiveItem {
  [key: string]: {
    id: number;
    name: string;
  };
}

export default function BookLookup() {
  const [openFreeForm, setOpenFreeForm] = useState(false);
  const [search, setSearch] = useState("");
  const { fetch, data, extra } = useSearch();
  const [activeItem, setActiveItem] = useState<ActiveItem>({});
  const [pagesRead, setPagesRead] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [bookRefId, setBooKRefId] = useState("");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [customDescription, setCustomDescription] = useState("")
  const [freeFormState, setFreeFormState] = useState({});
  const [questionnaireState, setQuestionnaireState] = useState({
    selectedType: "",
    selectedMood: [],
    selectedEnding: "",
    selectedPace: "",
    favoriteCharacter: "",
    favoriteMoment: "",
    Engagement: 0,
    Characters: 0,
    "Ease of reading": 0,
  });
  const handleFreeFormChange = (updatedFreeFormData) => {
    setFreeFormState(updatedFreeFormData);
  }; 
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  return (
    <>
      <div className="w-full justify-center flex">
        <div className="p-4 w-fit">
          <form
            id="booklookup"
            onSubmit={(e) => SubmitBookData(e, customDescription, date, data, extra, myRating, activeItem, pagesRead, questionnaireState, freeFormState, setBooKRefId)}
            className="flex flex-col gap-4 w-fit"
          >
            <div className="flex gap-4">
              <BookDetails
                data={data}
                myRating={myRating}
                setMyRating={setMyRating}
                dropdownItems={dropdownItems}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                pagesRead={pagesRead}
                setPagesRead={setPagesRead}
              />
              <BookAutoPulledUpInfo
                fetch={fetch}
                search={search}
                setSearch={setSearch}
                date={date}
                setDate={setDate}
                data={data}
                extra={extra}
              />
            </div>
            <BookDescription customDescription={customDescription} setCustomDescription={setCustomDescription} extra={extra} />
          </form>
        </div>
        {showQuestionnaire && (
          <Questionnaire
            onQuestionnaireChange={setQuestionnaireState}
            bookRef={bookRefId}
            onClose={() => setShowQuestionnaire(false)}
            questionnaireState={questionnaireState}
            setQuestionnaireState={setQuestionnaireState}
          />
        )}
        {openFreeForm && (
          <FreeForm
            freeFormData={freeFormState}
            onClose={() => setOpenFreeForm(false)}
            onFreeFormChange={handleFreeFormChange}
          />
        )}
      </div>
      <SaveButtons
        setOpenFreeForm={setOpenFreeForm}
        setShowQuestionnaire={setShowQuestionnaire}
      />
    </>
  );
}