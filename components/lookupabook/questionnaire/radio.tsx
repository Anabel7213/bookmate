export default function Radio({items, selection, setSelection}: any) {
    return (
        <>
        <div className="text-brown flex items-center gap-4">
            {items.map((item: any, i: number) => (
                <div onClick={() => setSelection(item.name)} key={i} className="flex items-center gap-1">
                    <div className="cursor-pointer rounded-full w-[16px] flex items-center justify-center h-[16px] border border-brown"><div className={`${selection === item.name ? "w-[10px] rounded-full h-[10px] bg-brown" : "hidden"}`}></div></div>
                    <h1 className="cursor-pointer">{item.name}</h1>
                </div>
            ))}
        </div>
        </>
    )
}