"use client";

import PokemonList from "@/components/PokemonList/PokemonList";
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { Suspense, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const timerId = useRef<any>(null);
  const getSearchParams = useSearchParams();
  const [searchText, setSearchText] = useState(getSearchParams.get("search") || "");
  const page = useMemo(() => Number(getSearchParams.get("page") || 0), [getSearchParams, searchText]);
  const limit = useMemo(() => Number(getSearchParams.get("limit") || 100), [getSearchParams, searchText]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerId) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      router.push(`?search=${e.target.value}&page=0`);

      setSearchText(e.target.value);
    }, 500);
  }

  return (
      <div className="p-5 flex flex-col w-full min-h-screen ">
        <div className="flex justify-center">
          <div className='flex items-center gap-2 p-3 rounded-md relative mb-5'>
            <Search className='absolute left-[20px] w-5 h-5' />
            <input style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", paddingTop: "9px" }} defaultValue={searchText} onChange={handleSearch} type="text" className='pr-3 pl-[35px] py-2 w-full  rounded-md' placeholder='Search a Pokemon' />
          </div>
        </div>
        <PokemonList search={searchText} page={page} limit={limit} router={router} />
      </div>
  );
}
