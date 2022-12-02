import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useLayoutEffect } from "react";

import { SearchTop, Typography } from "@components/index";
import { Login, ResetPassword } from "@components/Modal/index";
import { useGet } from "@library/useAPI";
import { getCookie, decompress } from "@library/useUtils";
import { useRouter } from "next/router";
import { deleteAllCookies } from "@library/useUtils";

import Logo from "@assets/Logo.svg";
import LogoMobile from "@assets/LogoMobile.svg";
import SearchYellow from "@assets/SearchYellow.svg";
import ICHamburger from "@assets/Hamburger.svg";
import ICTimes from "@assets/Times.svg";
import ICArrowUpGrey from "@assets/ArrowUpGrey.svg";
import ICArrowDownGrey from "@assets/ArrowDownGrey.svg";
import Language from "@assets/Language.png";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgot, setModalForgot] = useState(false);
  const [member, setMember] = useState(null);
  const router = useRouter();

  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "`how to`",
      isShow: false,
      subMenu: [
        {
          id: 1,
          name: "popular kategori",
          isShow: false,
        },
        {
          id: 2,
          name: "semua kategori",
          isShow: false,
        },
      ],
    },
    {
      id: 2,
      name: "panduan bisnis",
      isShow: false,
      subMenu: [
        {
          id: 1,
          name: "idea & plan",
          isShow: false,
        },
        {
          id: 2,
          name: "how to start",
          isShow: false,
        },
        {
          id: 3,
          name: "how to make profit",
          isShow: false,
        },
        {
          id: 4,
          name: "how to systemize",
          isShow: false,
        },
      ],
    },
    {
      id: 3,
      name: "peluang bisnis",
      isShow: false,
      subMenu: [
        {
          id: 1,
          name: "semua kategori",
          isShow: false,
        },
        {
          id: 2,
          name: "browse kategori",
          isShow: false,
        },
      ],
    },
    {
      id: 4,
      name: "bermitra",
      isShow: false,
      subMenu: [],
    },
  ]);

  const all = useGet("v1/category/fetch", { params: { limit: 100 } });
  const listAll = all?.isData?.data?.items;

  const popular = useGet("v1/category/terpopuler");
  const listPopular = popular?.isData?.data?.items;

  const panduan = useGet("v1/article/category-panduan");
  const listPanduan = panduan?.isData?.data?.items;

  const browse = useGet("v1/browse-category/fetch");
  const listBrowse = browse?.isData?.data?.items;

  const openModalForgot = () => {
    setModalForgot(!modalForgot);
    setModalLogin(!modalLogin);
  };

  const handleLogout = () => {
    deleteAllCookies();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  function LogOut({ onClick, link, label }) {
    return (
      <div
        onClick={onClick}
        className={` font-semibold text-primary cursor-pointer mr-5  
            ${
              router.asPath === link
                ? " font-semibold border-primary"
                : "text-primary"
            } 
            ${label === "Keluar"} 
            `}
      >
        {label}
      </div>
    );
  }

  // onClick={() =>
  //   router.push(
  //     `/category/${row.articleCategoryId}?${str}`
  //   )
  // }

  // function menuLink() {
  //   const router = useRouter();

  //   const handleClick = (e, row) => {
  //     e.preventDefault();
  //     router.push(`/category/${row.articleCategoryId}?${str}`);
  //   };

  //   <div className=" ml-5 space-y-2">
  //     {listPopular?.slice(0, 4).map((row) => {
  //       let str = row.articleCategoryTitle.replace(/ /g, "%").toLowerCase();
  //       return (
  //         <handleClick
  //           onClick={handleClick}
  //           // href={`/category/${row.articleCategoryId}?${str}`}
  //           key={row.articleCategoryId}
  //         >
  //           <div key={row.articleCategoryId} className="text-sm">
  //             {row.articleCategoryTitle}
  //           </div>
  //         </handleClick>
  //       );
  //     })}
  //   </div>;
  // }

  //   const MenuLink = () => {
  // onClick={() => router.push(`/category/${row.articleCategoryId}?${str}`)}
  //   };

  // let str = row.articleCategoryTitle.replace(/ /g, "%").toLowerCase();
  const handleClick = (CategoryId, str) => {
    router.push(`/category/${CategoryId}?${str}`);
    console.log(CategoryId);
  };

  useEffect(() => {
    const user = getCookie("user");
    if (user) setMember(JSON.parse(decompress(user)));
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 768) setNavbar(false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMenuShow = (id, val) => {
    const newMenu = menu.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          isShow: val,
        };
      } else {
        return {
          ...obj,
          isShow: false,
        };
      }
    });
    setMenu(newMenu);
  };

  const handleSubMenuShow = (menuId, id, val) => {
    const newMenu = menu.map((obj) => {
      if (obj.id === menuId) {
        const newSubMenu = obj.subMenu.map((obj2) => {
          if (obj2.id === id) {
            return {
              ...obj2,
              isShow: val,
            };
          } else {
            return {
              ...obj2,
              isShow: false,
            };
          }
        });
        return {
          ...obj,
          subMenu: newSubMenu,
        };
      }
      return obj;
    });
    setMenu(newMenu);
  };

  function MenuHow() {
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
      <div className="relative py-6 px-4 border-b-4 border-transparent hover:border-primary group">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[0].name}
        </span>
        <div className=" absolute p-8 px-12 bg-white mt-7 border-t-2 border-primary rounded-b-xl drop-shadow-xl hidden flex-col group-hover:flex w-[62rem] -left-16">
          <Typography text={menu[0].subMenu[0].name} variant="title" />
          {popular.isLoading && <p>Loading..</p>}
          {popular.isError ? (
            <p className=" text-sm text-red-500">{popular.isError.message}</p>
          ) : (
            <div className=" text-sm flex border-b py-1">
              {listPopular
                ?.slice(1, 4)
                .map((row) => redirectTo(row, "popular"))}
            </div>
          )}
          <Typography text={menu[0].subMenu[1].name} variant="title" />
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
    return (
      <div className="relative py-6 px-4 border-b-4 border-transparent hover:border-primary group">
        <span className=" text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[1].name}
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
    return (
      <div className=" relative py-6 px-4 border-b-4 border-transparent hover:border-primary group">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[2].name}
        </span>
        <div className=" absolute bg-gray-100 mt-7 border-t-2 border-primary rounded-b-xl drop-shadow-xl w-[60rem] -left-52 hidden group-hover:flex">
          {all.isLoading && <p>Loading..</p>}
          {all.isError ? (
            <p className=" text-sm text-red-500">{all.isError.message}</p>
          ) : (
            <>
              <div className=" panduan-container bg-white rounded-bl-xl">
                {listAll?.slice(0, 8).map((item) => (
                  <Link
                    key={item.articleCategoryId}
                    href={`/peluang-bisnis?category=${item.articleCategoryId}`}
                  >
                    <div>
                      <Typography
                        text={item.articleCategoryTitle}
                        variant="item"
                      />
                    </div>
                  </Link>
                ))}
              </div>
              <div className=" panduan-container bg-white">
                {listAll?.slice(9, 17).map((item) => (
                  <Link
                    key={item.articleCategoryId}
                    href={`/peluang-bisnis?category=${item.articleCategoryId}`}
                  >
                    <div>
                      <Typography
                        text={item.articleCategoryTitle}
                        variant="item"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className=" panduan-container ">
            <div className=" py-2 text-base text-primary">Browse Kategori</div>
            {browse.isLoading && <p>Loading..</p>}
            {browse.isError ? (
              <p className=" text-sm text-red-500">{browse.isError.message}</p>
            ) : (
              listBrowse?.map((item) => (
                <Link
                  key={item.browseCategoryId}
                  href={`/peluang-bisnis?browse=${item.browseCategoryId}`}
                >
                  <div>
                    <Typography
                      text={item.browseCategoryTitle}
                      variant="item"
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  function MenuBermitra() {
    return (
      <div className=" relative py-6 px-4 border-b-4 border-transparent hover:border-primary ">
        <span className="text-xs font-extrabold opacity-70 uppercase hover:cursor-pointer">
          {menu[3].name}
        </span>
      </div>
    );
  }

  // useEffect(() => {
  //   console.log("test");
  // }, []);

  console.log(listPopular);

  return (
    <>
      <nav className=" px-4 py-2 md:py-0 md:px-0  md:border-b md:border-none">
        <div className=" nav-container ">
          {/* Logo */}
          <Link href="/">
            <a className=" resize focus:outline-none hidden md:block">
              <Logo />
            </a>
          </Link>
          <Link href="/">
            <a className=" focus:outline-none md:hidden">
              <LogoMobile />
            </a>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-16">
            <MenuHow />
            <MenuPanduan />
            <MenuPeluang />
            <MenuBermitra />
          </div>

          <div className=" flex space-x-10 items-center">
            {/* Search Column */}
            <div className=" flex items-center space-x-4 md:space-x-2">
              <input
                onClick={() => setSearch(!search)}
                className=" py-1 px-2 font-extralight text-transparent placeholder:text-right border-b border-primary focus:outline-none hidden md:flex"
                placeholder="Cari aja disini"
              />
              {!navbar && !search ? (
                <>
                  <button onClick={() => setSearch(!search)}>
                    <SearchYellow />
                  </button>
                  <button
                    className=" md:hidden"
                    onClick={() => setNavbar(true)}
                  >
                    <ICHamburger />
                  </button>
                </>
              ) : (
                <button
                  className=" md:hidden"
                  onClick={() => {
                    setSearch(false);
                    setNavbar(false);
                  }}
                >
                  <ICTimes />
                </button>
              )}
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
                {/* <Image src={Language} alt="Language" width={20} height={20} /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setSearch(false)}
        className={` ${
          !search ? " -top-full" : "top-16 md:top-0"
        } fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all `}
      >
        <SearchTop
          search={search}
          data={listPopular}
          onClick={() => setSearch(false)}
        />
      </div>

      <div
        // onClick={() => setNavbar(false)}
        className={` ${
          !navbar ? " -top-full" : "top-16 md:top-0"
        } fixed bg-white backdrop-opacity-95 w-full h-full z-30 transition-all`}
      >
        {navbar ? (
          <div className=" p-4 md:p-8 flex flex-col justify-between h-full">
            <div className=" w-full">
              {/* If Login Member */}
              {member && !loading ? (
                <Link href={`/profil/detail`}>
                  <span className=" text-2xl font-bold opacity-75 cursor-pointer mr-5 text-right truncate hover:underline">
                    Hi! {member.name.split("@")[0]}
                  </span>
                </Link>
              ) : (
                ""
              )}

              <div className=" mt-8 space-y-5">
                {menu.map((m, idx) => (
                  <>
                    <div
                      key={m.id}
                      className=" font-bold uppercase items-center flex justify-between"
                      onClick={() => handleMenuShow(m.id, !m.isShow)}
                    >
                      {m.name}
                      {m.isShow ? <ICArrowUpGrey /> : <ICArrowDownGrey />}
                    </div>
                    {m.isShow ? (
                      <div className=" space-y-3">
                        {m.subMenu.map((sb, idx2) => (
                          <>
                            <div
                              key={sb.id}
                              className=" capitalize text-primary font-medium"
                              onClick={() =>
                                handleSubMenuShow(m.id, sb.id, !sb.isShow)
                              }
                            >
                              {sb.name}
                            </div>
                            {idx === 0 && idx2 === 0 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listPopular?.slice(0, 4).map((row) => {
                                  let str = row.articleCategoryTitle
                                    .replace(/ /g, "%")
                                    .toLowerCase();

                                  return (
                                    <div
                                      // onclick={() =>
                                      //   // row.articleCategoryId !== 1 &&
                                      //   handleClick(row.articleCategoryId)
                                      // }
                                      // href={`/category/${row.articleCategoryId}?${str}`}
                                      key={row.articleCategoryId}
                                    >
                                      <div
                                        key={row.articleCategoryId}
                                        className="text-sm"
                                        onclick={
                                          row.articleCategoryId !== 1 &&
                                          handleClick(row.articleCategoryId)
                                        }
                                      >
                                        {row.articleCategoryTitle}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                            {idx === 0 && idx2 === 1 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listAll?.slice(0, 16).map((item) => {
                                  let str = item.articleCategoryTitle
                                    .replace(/ /g, "%")
                                    .toLowerCase();
                                  return (
                                    <div
                                      href={`/category/${item.articleCategoryId}?${str}`}
                                      key={item.articleCategoryId}
                                      onClick={() => setNavbar(false)}
                                    >
                                      <div
                                        key={item.articleCategoryId}
                                        className="text-sm"
                                      >
                                        {item.articleCategoryTitle}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                            {idx === 1 && idx2 === 0 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listPanduan[0].articleList?.map((item) => (
                                  <Link
                                    key={item.article_id}
                                    href={`/panduan-bisnis/${item.article_id}`}
                                  >
                                    <div
                                      key={item.article_id}
                                      className="text-sm truncate"
                                    >
                                      {item.articleTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            {idx === 1 && idx2 === 1 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listPanduan[1].articleList?.map((item) => (
                                  <Link
                                    key={item.article_id}
                                    href={`/panduan-bisnis/${item.article_id}`}
                                  >
                                    <div
                                      key={item.article_id}
                                      className="text-sm truncate"
                                    >
                                      {item.articleTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            {idx === 1 && idx2 === 2 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listPanduan[2].articleList?.map((item) => (
                                  <Link
                                    key={item.article_id}
                                    href={`/panduan-bisnis/${item.article_id}`}
                                  >
                                    <div
                                      key={item.article_id}
                                      className="text-sm truncate"
                                    >
                                      {item.articleTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            {idx === 1 && idx2 === 3 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listPanduan[3].articleList?.map((item) => (
                                  <Link
                                    key={item.article_id}
                                    href={`/panduan-bisnis/${item.article_id}`}
                                  >
                                    <div
                                      key={item.article_id}
                                      className="text-sm truncate"
                                    >
                                      {item.articleTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            {idx === 2 && idx2 === 0 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listAll.slice(0, 16).map((item) => (
                                  <Link
                                    key={item.articleCategoryId}
                                    href={`/peluang-bisnis?category=${item.articleCategoryId}`}
                                  >
                                    <div
                                      key={item.articleCategoryId}
                                      className="text-sm truncate"
                                    >
                                      {item.articleCategoryTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                            {idx === 2 && idx2 === 1 && sb.isShow ? (
                              <div className=" ml-5 space-y-2">
                                {listBrowse.map((item) => (
                                  <Link
                                    key={item.browseCategoryId}
                                    href={`/peluang-bisnis?browse=${item.browseCategoryId}`}
                                  >
                                    <div
                                      key={item.browseCategoryId}
                                      className="text-sm truncate"
                                    >
                                      {item.browseCategoryTitle}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </>
                        ))}
                      </div>
                    ) : null}
                  </>
                ))}
              </div>
            </div>

            <button className=" flex items-center space-x-2 mb-16">
              {member && !loading ? (
                <LogOut
                  onClick={() => handleLogout()}
                  link={`/`}
                  label="KELUAR"
                />
              ) : (
                <span
                  onClick={() => setModalLogin(!modalLogin)}
                  className=" font-semibold text-primary cursor-pointer mr-5 "
                >
                  {loading ? "Loading.." : "MASUK"}
                </span>
              )}
            </button>
          </div>
        ) : null}
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
