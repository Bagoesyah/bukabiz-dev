import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { SearchTop, Typography } from "@components/index";
import { Login, ResetPassword } from "@components/Modal/index";
import { useGet } from "@library/useAPI";
import { getCookie, decompress } from "@library/useUtils";

import Logo from "@assets/Logo.svg";
import SearchYellow from "@assets/SearchYellow.svg";
import Language from "@assets/Language.png";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgot, setModalForgot] = useState(false);
  const [member, setMember] = useState(null);
  const [navMobile, setNavMobile] = useState(false);

  const menu = ["`how to`", "panduan bisnis", "peluang bisnis", "bermitra"];
  const howTo = ["Popular Kategori", "Semua Kategori"];
  const peluang = [
    {
      id: 1,
      title: "Semua Kategori",
      menu: [
        "Otomotif",
        "Bisnis Jasa/ Agensi",
        "Furniture & Properti",
        "Pendidikan, Kursus, Pelatihan",
        "Hiburan & Hobi",
        "Penginapan & Travel",
        "Komputer & Teknologi",
        "Kuliner, Makanan & Minuman",
        "Laundry & Jasa Kebersihan",
        "Kesehatan & Kecantikan",
        "Ibu, Anak & Balita",
        "Retail & Minimarket",
        "Pertanian & Peternakan",
        "Keuangan & Asuransi ",
        "Produk & Layanan Digital",
        "Lain - Lain",
      ],
    },
    {
      id: 2,
      name: "Browse Kategori",
      menu: ["Konsep Bisnis", "Business Opportunity", "Lisensi", "Franchise"],
    },
  ];
  const categorySearch = [
    "roasting kopi",
    "panggang roti",
    "adonan croissant",
    "franchise menantea",
  ];

  const all = useGet("v1/category/fetch", { params: { limit: 100 } });
  const listAll = all?.isData?.data?.items;

  const openModalForgot = () => {
    setModalForgot(!modalForgot);
    setModalLogin(!modalLogin);
  };

  useEffect(() => {
    const user = getCookie("user");
    if (user) setMember(JSON.parse(decompress(user)));
    setLoading(false);
  }, []);

  function MenuHow() {
    const popular = useGet("v1/category/terpopuler");
    const listPopular = popular?.isData?.data?.items;

    const redirectTo = (row, type) => {
      let str = row.articleCategoryTitle.replace(/ /g, "%").toLowerCase();
      return (
        <Link
          href={`/category/${row.articleCategoryId}?${str}`}
          key={row.articleCategoryId}
        >
          <div
            className={` ${
              type === "all"
                ? "item-cat"
                : "cursor-pointer font-medium tracking-tighter hover:text-primary w-48 mr-8"
            } `}
          >
            {row.articleCategoryTitle}
          </div>
        </Link>
      );
    };

    const HowAllCategory = (order) => {
      return (
        <div className=" flex flex-col w-48 mr-12">
          {listAll?.length >= 1 &&
            listAll
              .slice(
                order === 1 ? 0 : order === 2 ? 5 : order === 3 ? 10 : 15,
                order === 1 ? 5 : order === 2 ? 10 : order === 3 ? 15 : 20
              )
              .map((row) => redirectTo(row, "all"))}
        </div>
      );
    };

    return (
      <div className="relative pb-4 md:pb-0 md:py-6 md:px-4 border-b-4 border-transparent hover:border-primary group">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[0]}
        </span>
        <div className=" absolute p-8 px-12 bg-white mt-7 border-t-2 border-primary rounded-b-xl drop-shadow-xl hidden flex-col group-hover:flex w-[62rem] -left-16">
          <Typography text={howTo[0]} variant="title" />
          {popular.isLoading && <p>Loading..</p>}
          {popular.isError ? (
            <p className=" text-sm text-red-500">{popular.isError.message}</p>
          ) : (
            <div className=" text-sm flex border-b py-1">
              {listPopular
                ?.slice(0, 4)
                .map((row) => redirectTo(row, "popular"))}
            </div>
          )}
          <Typography text={howTo[1]} variant="title" />
          <div className=" flex">
            {all.isLoading && <p>Loading..</p>}
            {all.isError ? (
              <p className=" text-sm text-red-500">{all.isError.message}</p>
            ) : (
              <>
                {HowAllCategory(1)}
                {HowAllCategory(2)}
                {HowAllCategory(3)}
                {HowAllCategory(4)}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  function MenuPanduan() {
    const panduan = useGet("v1/article/category-panduan");
    const listPanduan = panduan?.isData?.data?.items;

    return (
      <div className="relative py-4 md:py-6 md:px-4 border-b-4 border-transparent hover:border-primary group">
        <span className=" text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[1]}
        </span>
        <div className=" absolute p-8 px-12 bg-white mt-7 border-t-2 border-primary rounded-b-xl drop-shadow-xl hidden flex-col group-hover:flex w-[82rem] -left-[22rem]">
          <div className=" flex space-x-16">
            {listPanduan?.slice(0, 4).map((row) => (
              <div key={row.businessStageId} className=" flex flex-col">
                <Typography text={row.title} variant="title" />
                {row?.articleList?.length > 0 &&
                  row?.articleList?.map((item) => (
                    <Link
                      key={item.article_id}
                      href={`/panduan-bisnis/${item.article_id}`}
                    >
                      <div className=" flex items-center item-cat ">
                        <Typography
                          text={
                            item.articleTitle.length < 30
                              ? item.articleTitle
                              : item.articleTitle.slice(0, 30).toLowerCase() +
                                ".."
                          }
                          className=" font-medium capitalize"
                        />
                        {item?.pricing_level?.article_pricing_id === 2 && (
                          <span className=" ml-2 bg-black text-white text-xs px-1 uppercase rounded">
                            pro
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function MenuPeluang() {
    const browse = useGet("v1/browse-category/fetch");
    const listBrowse = browse?.isData?.data?.items;

    return (
      <div className=" relative py-4 md:py-6 md:px-4 border-b-4 border-transparent hover:border-primary group">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[2]}
        </span>
        <div className=" absolute bg-gray-100 mt-7 border-t-2 border-primary rounded-b-xl drop-shadow-xl w-[60rem] -left-52 hidden group-hover:flex">
          {all.isLoading && <p>Loading..</p>}
          {all.isError ? (
            <p className=" text-sm text-red-500">{all.isError.message}</p>
          ) : (
            <>
              <div className=" panduan-container bg-white rounded-bl-xl">
                {listAll?.slice(0, 8).map((item) => (
                  <Typography
                    key={item.articleCategoryId}
                    text={item.articleCategoryTitle}
                    variant="item"
                  />
                ))}
              </div>
              <div className=" panduan-container bg-white">
                {listAll?.slice(9, 17).map((item) => (
                  <Typography
                    key={item.articleCategoryId}
                    text={item.articleCategoryTitle}
                    variant="item"
                  />
                ))}
              </div>
            </>
          )}
          <div className=" panduan-container ">
            <div className=" py-2 text-base text-primary">
              {peluang[1].name}
            </div>
            {browse.isLoading && <p>Loading..</p>}
            {browse.isError ? (
              <p className=" text-sm text-red-500">{browse.isError.message}</p>
            ) : (
              listBrowse?.map((item) => (
                <Typography
                  key={item.browseCategoryId}
                  text={item.browseCategoryTitle}
                  variant="item"
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  function MenuBermitra() {
    return (
      <div className=" relative py-4 md:py-6 md:px-4 border-b-4 border-transparent hover:border-primary ">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[3]}
        </span>
      </div>
    );
  }

  const handleNavbar = () => {
    setNavMobile(!navMobile);
  };

  return (
    <>
      <nav
        className={`transition-all duration-1000 sticky top-0 left-0 right-0 bg-white w-full py-5 md:py-2 ${
          navMobile ? `h-screen` : ""
        }`}
      >
        <div
          className={`sm:nav-container flex  w-full ${
            navMobile
              ? `flex-col gap-[50px]`
              : "flex items-center justify-between"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-between w-full sm:w-auto sm:justify-start items-center">
            <Link href="/" className={`${navMobile ? `` : "w-full"}`}>
              <a className="focus:outline-none">
                <Logo />
              </a>
            </Link>
            <div className="flex md:hidden gap-2">
              <div className={`${navMobile ? "hidden" : "flex"}`}>
                <button onClick={() => setSearch(!search)}>
                  {search ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/75/75519.png"
                      alt=""
                      className="w-[20px]"
                    />
                  ) : (
                    <SearchYellow />
                  )}
                </button>
              </div>
              {/* hamburger */}
              <div className={`${search ? "hidden" : "flex"}`}>
                <div className="flex" onClick={() => handleNavbar()}>
                  {navMobile ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/75/75519.png"
                      alt=""
                      className="w-[20px]"
                    />
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
                      alt=""
                      className="w-[25px]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Say Hi */}
          {navMobile && (
            <div className="flex">
              {member && !loading ? (
                <Link href={`/profil/detail`}>
                  <span className="text-xs font-extrabold opacity-70 cursor-pointer mr-5 text-right truncate hover:underline">
                    Hi! {member.name.split("@")[0]}
                  </span>
                </Link>
              ) : (
                <span
                  onClick={() => setModalLogin(!modalLogin)}
                  className="text-xs font-extrabold opacity-70 cursor-pointer mr-5 "
                >
                  {loading ? "Loading.." : "MASUK"}
                </span>
              )}
            </div>
          )}
          {/* Menu */}
          <div
            className={`${
              navMobile
                ? "flex flex-col w-full font-bold"
                : "hidden md:flex md:gap-[50px]"
            }`}
          >
            <MenuHow />
            <MenuPanduan />
            <MenuPeluang />
            <MenuBermitra />
          </div>

          <div className="hidden sm:flex md:space-x-10 gap-4 h-full">
            {/* Search Column */}
            <div className=" md:flex items-center space-x-2">
              <input
                onClick={() => setSearch(!search)}
                className="hidden md:flex py-1 px-2 font-extralight text-transparent placeholder:text-right border-b border-primary focus:outline-none"
                placeholder="Cari aja disini"
              />
              <button onClick={() => setSearch(!search)}>
                <SearchYellow />
              </button>
            </div>
            <div className="hidden md:flex items-center">
              <div className=" flex items-center">
                {/* If Login Member */}
                {member && !loading ? (
                  <Link href={`/profil/detail`}>
                    <span className="text-xs font-extrabold opacity-70 cursor-pointer mr-5 text-right truncate hover:underline">
                      Hi! {member.name.split("@")[0]}
                    </span>
                  </Link>
                ) : (
                  <span
                    onClick={() => setModalLogin(!modalLogin)}
                    className="text-xs font-extrabold opacity-70 cursor-pointer mr-5 "
                  >
                    {loading ? "Loading.." : "MASUK"}
                  </span>
                )}
                <Image src={Language} alt="Language" width={20} height={20} />
              </div>
            </div>
          </div>
          {navMobile && (
            <div className="flex items-end h-full">
              <Image
                src={Language}
                alt="Language"
                width={20}
                height={20}
              ></Image>
              <span className="ml-2">English</span>
            </div>
          )}
        </div>
      </nav>
      <div
        onClick={() => setSearch(false)}
        className={` ${
          !search ? " -top-full" : "top-0"
        } fixed bg-black/50 backdrop-opacity-95 w-full h-full z-10 mt-5 transition-all`}
      >
        <SearchTop
          search={search}
          data={categorySearch}
          className="flex flex-col"
        />
      </div>

      {modalLogin && (
        <Login
          onClick={() => setModalLogin(!modalLogin)}
          openModalForgot={openModalForgot}
        />
      )}

      {modalForgot && <ResetPassword onClick={openModalForgot} />}
    </>
  );
}

export default Navbar;
