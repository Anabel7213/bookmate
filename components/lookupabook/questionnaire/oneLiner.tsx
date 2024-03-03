export default function OneLiner({items, onChange}: any) {
    return (
        <>
        <div className="text-brown flex flex-col gap-2">
            {items.map((item: any, i: number) => (
                <div key={i} className="flex flex-col">
                    <h1>{item.name}</h1>
                    <input onChange={(e) => onChange(e.target.value)} type="text" name={item.name} className="outline-none border-b border-brown w-full"/>
                </div>
            ))}
        </div>
        </>
    )
}