import { Slider } from "@/components/ui/slider";

export default function Range({
  items,
  handleRangeChange,
  questionnaireState,
}: any) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item: any, index: number) => (
        <div key={index} className="flex flex-col">
          <h1>{item.name}</h1>
          <Slider
            max={10}
            value={[questionnaireState[item.name] || 0]}
            step={1}
            onValueChange={(newValue) =>
              handleRangeChange(item.name, newValue[0])
            }
          />
        </div>
      ))}
    </div>
  );
}
