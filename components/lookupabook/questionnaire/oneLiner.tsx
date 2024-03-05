export default function OneLiner({
  items,
  onChangeHandlers,
  questionnaireState,
}) {
  return (
    <div className="text-brown flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col">
          <h1>{item.name}</h1>
          <input
            value={questionnaireState[item.stateKey] || ""}
            onChange={(e) => {
              if (onChangeHandlers[item.stateKey]) {
                onChangeHandlers[item.stateKey](e.target.value);
              }
            }}
            type="text"
            name={item.name}
            className="outline-none border-b border-brown w-full"
          />
        </div>
      ))}
    </div>
  );
}
