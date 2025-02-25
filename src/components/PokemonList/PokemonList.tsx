"use client";

import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { toPascalCase } from "@/Utils/utils";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./index.css"
import { TablePagination } from "@mui/material";

interface PokemonsInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export function PokemonList({ search = "", limit = 100, page = 0, router }: { search?: string; limit?: number; page?: number; router: any }) {
  const [data, setData] = useState<PokemonsInterface["results"]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState<{ page: number; limit: number }>({
    page, limit
  });

  const handleChangePage = (_: any, value: number) => {
    setPaginationData({ ...paginationData, page: +value })
    router.push(`?search=${search}&page=${value}&limit=${paginationData.limit}`);
  }

  const handleChangeRowsPerPage = (e: any) => {
    setPaginationData(p => ({ ...p, limit: Number(e.target.value) }))
    router.push(`?search=${search}&page=${paginationData.page}&limit=${e.target.value}`);
  }

  const { noOfFilteredRows, newRows } = useMemo(() => {
    let rows = search ? data.filter((pokemon) => pokemon.name.includes(search)) : data;
    const startIndex = (paginationData.page) * paginationData.limit; // Start index for the page
    const endIndex = startIndex + paginationData.limit; // End index for the page

    return {
      noOfFilteredRows: rows.length,
      newRows: rows.slice(startIndex, endIndex),
    };
  }, [data, search, paginationData])


  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const timeout = setTimeout(() => {
      setLoading(true)
      axios.get<PokemonsInterface>(`https://pokeapi.co/api/v2/pokemon?limit=${100000}&offset=${0}`, { signal }).then((response) => {
        setData(response.data.results)
        setLoading(false)
      })
    }, 500)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  return (
    <>
      {loading && <div>
        <div className="flex items-center justify-center flex-1 w-full min-h-48">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>}
      <div className="grid gap-4 w-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">

        {
          !loading && newRows.map((pokemon) => (
            <Link href={`/${pokemon.name}`} key={pokemon.name} prefetch className="flex items-center justify-between gap-2 p-3 w-full min-w-fit rounded-md overflow-hidden cursor-pointer bg-[--secondary-background] hover:bg-gray-100 transition-all " style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
              <div className="flex items-center justify-between gap-2">
                <Image src={`/pokeball.png`} width={20} height={20} alt={""} />
                <span>{toPascalCase(pokemon.name)}</span>
              </div>
              <SquareArrowOutUpRight className="w-3 h-3 text-gray-600 transition-all hover:text-black " />
            </Link>
          ))
        }
      </div>
      <div className="fixed bottom-0 right-0 left-0 flex justify-center w-full p-3 bg-white">
        {/* <Pagination page={paginationData.page} count={Math.ceil(noOfFilteredRows / paginationData.limit)} onChange={ } /> */}
        <TablePagination
          component="div"
          count={noOfFilteredRows}
          page={paginationData.page}
          onPageChange={handleChangePage}
          rowsPerPage={paginationData.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  )
}

export default PokemonList