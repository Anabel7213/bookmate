export default function ReadingProgress({onChange, percentage}: any) {
    const progressStyle = {
        width: `${Math.round(percentage * 100)}%`,
        backgroundColor: '#5C493E',
        height: '100%',
        borderRadius: 'inherit',
      };
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <h1 className="whitespace-nowrap">I&#39;m on page</h1>
          <input onChange={(e) => onChange(Number(e.target.value))} className="border-b outline-none border-brown/30 w-full md:w-[48px]" />
        </div>
        <div className="flex flex-col">
         <div className={`rounded-full border border-brown h-[12px]`}>
            <div className="transition-all duration-100" style={progressStyle}></div>
         </div>
         <span>{percentage >= 1 ? "Finished" : `${Math.round(percentage * 100)}%`}</span>
        </div>
      </div>
    </>
  );
}