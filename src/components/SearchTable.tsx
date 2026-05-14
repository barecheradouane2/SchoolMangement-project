"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchTable = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`?name=${name}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px]
      ring-gray-300 px-2"
    >
      <Image src="/search.png" alt="logo" width={14} height={14} />

      <input
        type="text"
        placeholder="Search from Table"
        className="bg-transparent w-[200px] p-2 outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
};

export default SearchTable;