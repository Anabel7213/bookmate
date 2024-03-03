export default function Checkbox({items, selected, setSelected}: any) {
    const toggleSelection = (item: any) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((selectedItem: any) => selectedItem !== item));
        } else {
            setSelected([...selected, item]);
        }
    };
    return (
        <>
        <div className="grid grid-cols-3 gap-4">
            {items.map((item: any, i: number) => (
                <div onClick={() => toggleSelection(item)} key={i} className="flex items-center gap-1">
                    <div className="rounded-[4px] w-[16px] h-[16px] border-brown border flex items-center cursor-pointer justify-center"><div className={`${selected.includes(item) ? "h-[10px] w-[10px] bg-brown rounded-[4px]" : "hidden"}`}></div></div>
                    <h1>{item}</h1>
                </div>
            ))}
        </div>
        </>
    )
}