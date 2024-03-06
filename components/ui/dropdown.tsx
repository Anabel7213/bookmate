import { ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Item {
  id: number;
  name: string;
  icon?: JSX.Element;
}

export default function Dropdown({ data, activeItem, setActiveItem }: any) {
  const [expandDropdown, setExpandDropdown] = useState<string | null>(null);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
       setExpandDropdown(null); 
    }
  };
  useEffect(() => {
    if (expandDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside); 
  }, [expandDropdown]);

  const handleSetActiveItem = ({ parentId, childId, childName }: { parentId: string; childId: number; childName: string }) => {
    setActiveItem((prev: any) => ({
      ...prev,
      [parentId]: { id: childId, name: childName },
    }));
  };

  return (
    <>
      <div ref={dropdownRef} className="flex flex-col gap-4">
        {data?.map((item: any, index: number) => (
          <div key={index}>
            <div
              onClick={() => {
                if (expandDropdown === item.name) {
                  setExpandDropdown(null);
                } else {
                  setExpandDropdown(item.name);
                }
              }}
              className=""
            >
              <div className="flex cursor-pointer justify-between gap-4 border-b border-brown">
                <h1 className="">{activeItem[item.name]?.name || item.name}</h1>
                <ChevronsUpDown size={20} strokeWidth={1} />
              </div>
            </div>
            <div
              className={`${expandDropdown !== item.name && 'hidden'} flex flex-col p-1 w-[136px] rounded-[4px] border border-brown mt-2 absolute z-10 bg-white shadow-custom`}
            >
              {expandDropdown === item.name &&
                item.items.map((subItem: any) => (
                  <div
                    onClick={() => handleSetActiveItem({ parentId: item.name, childId: subItem.id, childName: subItem.name })}
                    key={subItem.id}
                    className="p-1 rounded-[4px] flex cursor-pointer items-center gap-1 hover:bg-brown/10"
                  >
                    {subItem.icon}
                    {subItem.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}