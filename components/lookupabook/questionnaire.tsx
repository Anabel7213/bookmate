import { useState } from "react"
import Radio from "./questionnaire/radio"
import { X } from "lucide-react"
import OneLiner from "./questionnaire/oneLiner"
import Checkbox from "./questionnaire/checkbox"
import Range from "./questionnaire/range"

export default function Questionnaire({onClose, onSubmitQuestionnaire}: any) {
    const types = [
        {
            name: "Book",
        },
        {
            name: "Audiobook",
        }
    ]
    const radios = [
        {
            name: "Ending",
            options: [
                {
                    name: "Strong",
                },
                {
                    name: "Weak"
                }
            ]
        },
        {
            name: "Pace",
            options: [
                {
                    name: "Slow",
                },
                {
                    name: "Medium"
                },
                {
                    name: "Fast"
                }
            ]
        }
    ]
    const oneLiners = [
        {
            name: "Favorite Character"
        },
        {
            name: "Favorite Moment"
        }
    ]
    const moods = [
        "Captivating", "Informative", "Inspiring", "Adventurous", "Hilarious", "Challenging", "Tense", "Saddening", "Relaxing", "Dark", "Boring", "Emotional"
    ]
    const ranges = [
        {
            name: "Engagement"
        },
        {
            name: "Characters"
        },
        {
            name: "Ease of reading"
        }
    ]
    const [ selectedType, setSelectedType ] = useState()
    const [ selectedMood, setSelectedMood ] = useState([])
    return (
        <>
        {/* <button onClick={() => console.log(selectedMood)}>test</button> */}
        <form onSubmit={onSubmitQuestionnaire} className="flex flex-col gap-6 min-w-[500px]">
        <div onClick={onClose} className="text-brown/50 hover:text-brown transition-all hover:bg-brown/10 cursor-pointer self-end justify-end flex p-1 w-fit rounded-[4px]"><X size={20} strokeWidth={1}/></div>
            <div className="flex flex-col gap-4 items-end">
                <Radio items={types} selection={selectedType} setSelection={setSelectedType} />
            </div>
            <Range items={ranges} />
            <div className="flex flex-col gap-2">
                {radios.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center justify-between">
                        <h1>{item.name}</h1>
                        <Radio items={item.options} />
                    </div>
                ))}
            </div>
            <Checkbox selected={selectedMood} setSelected={setSelectedMood} items={moods} />
            <OneLiner items={oneLiners} onChange={() => {}} />
        </form>
        </>
    )
}