import { useEffect, useState } from "react";
import Radio from "./questionnaire/radio";
import { X } from "lucide-react";
import OneLiner from "./questionnaire/oneLiner";
import Checkbox from "./questionnaire/checkbox";
import Range from "./questionnaire/range";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { moods, oneLiners, radios, ranges, types } from "@/dataPoints";

export default function Questionnaire({
  questionnaireState,
  setQuestionnaireState,
  onClose,
}: any) {
  const [selectedType, setSelectedType] = useState(
    questionnaireState.selectedType
  );
  const [selectedMood, setSelectedMood] = useState(
    questionnaireState.selectedMood
  );
  const [selectedEnding, setSelectedEnding] = useState(
    questionnaireState.selectedEnding
  );
  const [selectedPace, setSelectedPace] = useState(
    questionnaireState.selectedPace
  );
  const [favoriteCharacter, setFavoriteCharacter] = useState(
    questionnaireState.favoriteCharacter
  );
  const [favoriteMoment, setFavoriteMoment] = useState(
    questionnaireState.favoriteMoment
  );
  useEffect(() => {
    setQuestionnaireState((prevState) => ({
      ...prevState,
      selectedType,
      selectedMood,
      selectedEnding,
      selectedPace,
      favoriteCharacter,
      favoriteMoment,
      Engagement: prevState.Engagement,
      Characters: prevState.Characters,
      "Ease of reading": prevState["Ease of reading"],
    }));
  }, [
    selectedType,
    selectedMood,
    selectedEnding,
    selectedPace,
    favoriteCharacter,
    favoriteMoment,
    setQuestionnaireState,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionnaireData = {
      type: selectedType || "",
      ending: selectedEnding || "",
      pace: selectedPace || "",
      mood: selectedMood || [],
      favoriteCharacter: favoriteCharacter || "",
      favoriteMoment: favoriteMoment || "",
      ...questionnaireState,
    };
    try {
      await addDoc(collection(db, "questionnaires"), {
        ...questionnaireData,
      });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  const handleRangeChange = (rangeName, newValue) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setQuestionnaireState((prevValues) => ({
      ...prevValues,
      [rangeName]: value,
    }));
  };
  return (
    <>
      <div className="w-full md:w-[600px] fixed text-brown shadow-popup mb-8 self-center bg-white rounded-[4px] border border-brown p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between gap-4 items-center">
            <div className="flex flex-col gap-4 items-end">
              <Radio
                items={types}
                selection={selectedType}
                setSelection={setSelectedType}
              />
            </div>
            <div
              onClick={onClose}
              className="text-brown/50 hover:text-brown transition-all hover:bg-brown/10 cursor-pointer self-end justify-end flex p-1 w-fit rounded-[4px]"
            >
              <X size={20} strokeWidth={1} />
            </div>
          </div>
          <Range
            items={ranges}
            questionnaireState={questionnaireState}
            handleRangeChange={handleRangeChange}
          />
          <div className="flex flex-col gap-2">
            {radios.map((item, i) => (
              <div key={i} className="flex gap-4 items-center justify-between">
                <h1>{item.name}</h1>
                <Radio
                  selection={
                    item.name === "Ending" ? selectedEnding : selectedPace
                  }
                  setSelection={
                    item.name === "Ending" ? setSelectedEnding : setSelectedPace
                  }
                  items={item.options}
                />
              </div>
            ))}
          </div>
          <Checkbox
            selected={selectedMood}
            setSelected={setSelectedMood}
            items={moods}
          />
          <OneLiner
            items={oneLiners}
            onChangeHandlers={{
              favoriteCharacter: setFavoriteCharacter,
              favoriteMoment: setFavoriteMoment,
            }}
            questionnaireState={questionnaireState}
          />
        </form>
      </div>
    </>
  );
}