export default function Range({items}: any) {
    return (
        <>
        <div className="flex flex-col gap-2">
            {items.map((item: any, i: number) => (
                <div key={i} className="flex flex-col">
                    <h1>{item.name}</h1>
                    <div className="border border-brown rounded-full w-full h-[6px] flex items-center"><div className="rounded-full ml-[-4px] border-brown bg-brown border w-[16px] h-[16px]"></div></div>
                </div>
            ))}
        </div>
        </>
    )
}