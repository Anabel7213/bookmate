export default function Placeholder({width}: any) {
    return (
        <>
        <div className={`border shadow-custom border-brown rounded-[4px] flex-shrink-0 bg-beige h-[160px] ${width} md:w-[120px] animate-pulse`}></div>
        </>
    )
}