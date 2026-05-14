"use client";

import { useRouter, useSearchParams } from "next/navigation";


const Pagination = ({ totalPages,page }: { totalPages: number,page:number }) => {

   const router = useRouter();

   totalPages = Number(totalPages);

  const changePage = (p: number) => {
    router.push(`?page=${p}`);
  };


  return (
    <div className='flex justify-between items-center mt-4'>
        <button className="px-3 py-1 text-xs  disabled bg-gray-100 text-gray-500  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
        
          disabled={page <= 1}

          onClick={()=>changePage(page-1)}
        
        >Prev</button>
        <div className="flex gap-2">

               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => changePage(p)}
          className={`px-3 py-1 border rounded ${
            page === p ? "bg-lamaSky text-black" : "text-black"
          }`}
        >
          {p}
        </button>
      ))}


        </div>
        <button  className="px-3 py-1 text-xs  disabled bg-gray-100 text-gray-500  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
          disabled={page >= totalPages}

          onClick={()=>changePage(page+1)}
        
        
        >Next</button>

    </div>
  )
}

export default Pagination