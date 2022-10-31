import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Search from "@assets/Search.svg";
import Clear from "@assets/Clear.svg";

function SearchWithType({ className, onChange }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState(1);
  const typeList = [
    {
      id: 1,
      name: "How To",
    },
    {
      id: 2,
      name: "Panduan",
    },
    {
      id: 3,
      name: "Peluang",
    },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      router.push(`/search?type=${type}&keyword=${keyword}`);
    }
  };

  useEffect(() => {
    if (router.query.type) {
      setType(router.query.type);
      setKeyword(router.query.keyword);
    }
  }, [router]);

  const handleType = (val) => {
    setType(val);
    if (router.route === "/search") onChange(val);
  };

  return (
    <div
      className={`relative bg-white flex rounded-full p-3 md:p-4 md:px-8 items-center ${className}`}
      style={{ boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.1)` }}
    >
      <Search className="absolute md:relative" />
      <input
        type="text"
        className="py-1 px-1 pl-8 w-full text-sm md:pl-4 md:px-4 md:w-[33rem] md:text-lg focus:outline-none"
        placeholder="Ketik di sini"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {keyword && (
        <div
          className="absolute right-44 cursor-pointer"
          onClick={() => setKeyword("")}
        >
          <Clear />
        </div>
      )}
      <div className=" text-xl px-1 md:text-4xl text-gray-300 md:px-4">|</div>
      <select
        className=" text-sm md:text-lg font-bold opacity-70 focus:outline-none"
        value={type}
        onChange={(e) => handleType(e.target.value)}
      >
        {typeList?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SearchWithType;
