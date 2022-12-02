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

  // const handleKeyDown = (e, event) => {
  //   if (e.key === "Enter" && e.target.value !== "") {
  //     router.push(`/search?type=${type}&keyword=${keyword}`);
  //   }
  // };

  const handleOnClick = (e) => {
    router.push(`/search?type=${type}&keyword=${keyword}`);
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

  const onFormSubmit = e => {
    e.preventDefault();
    router.push(`/search?type=${type}&keyword=${keyword}`);
  }

  return (
    <div
      className={`relative bg-white flex rounded-full px-4 p-4 md:px-8 mx-2 md:mx-0 items-center ${className}`}
      style={{ boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.1)` }}
    >
      <Search
        className="absolute md:relative cursor-pointer"
        onClick={(e) => handleOnClick(e.target.value)}
      />
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          className="py-1 mx-2 w-full pl-8 md:pl-0 md:w-[33rem] text-sm md:text-lg focus:outline-none"
          placeholder="Ketik di sini"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        // onKeyDown={(e) => handleKeyDown(e)}
        />
      </form>
      {keyword && (
        <div
          className="absolute right-32 md:right-44 cursor-pointer"
          onClick={() => setKeyword("")}
        >
          <Clear />
        </div>
      )}
      <div className=" text-xl md:text-4xl text-gray-300 px-2">|</div>
      <select
        className=" text-sm md:text-lg font-bold opacity-70 focus:outline-none bg-white"
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
