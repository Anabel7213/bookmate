import Placeholder from "@/components/placeholder";
import Search from "@/components/search";
import Stats from "@/components/stats";
import Tabs from "@/components/tabs";

export default function Home() {
  return (
    <>
    <div className="px-4 md:py-16">
      <div className="md:grid md:grid-cols-3 gap-4 flex flex-col">
        <div className="flex flex-col gap-4 col-span-2">
          <Tabs />
          <div className="md:flex gap-2 grid grid-cols-3 items-center md:flex-wrap col-span-2">
          {Array.from({length: 14}).map((_, i) => (
            <Placeholder key={i} />
          ))}
          </div>
        </div>
        <Stats />
      </div>
      <Search />
    </div>
    </>
  )
}