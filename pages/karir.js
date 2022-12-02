import { useEffect, useState } from "react"

import {
  axiosGet,
  axiosPost
} from "@library/useAxios";
import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

import ICSearch from '@assets/Search@2x.svg'
import ICMapPinLine from '@assets/MapPinLine@2x.svg'
import ICArrowDown from '@assets/ArrowDown.svg'
import Link from "next/link";

function karir() {
  const [loading, setLoading] = useState(true)
  const [showCities, setShowCities] = useState(false)
  const [categoryAll, setCategoryAll] = useState(false)
  const [listJob, setListJob] = useState({})
  const [listFilter, setListFilter] = useState({
    category: {},
    type: {},
    cities: {},
  })
  const [cities, setCities] = useState({
    id: '',
    name: 'Lokasi pekerjaan'
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    getDataFilter("category", "v1/category-job/fetch");
    getDataFilter("type", "v1/type-job/fetch");
    getDataFilter("cities", "v1/cities/fetch?limit=1000");
  }, []);

  const getDataFilter = (name, url) => {
    axiosGet(
      url,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {

        // if (name === "category") {
        setListFilter((prevState) => {
          return {
            ...prevState,
            [name]: {
              ...success.data.data,
              items: success.data.data.items.map(row => {
                return {
                  ...row,
                  isShow: false
                }
              }),
            }
          }
        });
        // }

        // if (name === "sort") {
        //   setFilter((prevState) => {
        //     return {
        //       ...prevState,
        //       sort: {
        //         id: success?.data?.data?.items[0]?.peluangCatFilId,
        //         name: success?.data?.data?.items[0]?.peluangCategoryTitle,
        //       },
        //     };
        //   });
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleCheckBox = (id, val, typeFilter) => {
    if (typeFilter === 'category') {
      const newCategory = listFilter.category.items.map((obj) => {
        if (obj.categoryJobId === id) {
          return {
            ...obj,
            isShow: val,
          };
        }
        return obj;
      })
      setListFilter(listFilter => {
        return {
          ...listFilter,
          category: {
            ...listFilter.category,
            items: newCategory
          }
        }
      });
      setCategoryAll(val && categoryAll ? true : false)
    } else {
      const newType = listFilter.type.items.map((obj) => {
        if (obj.typeJobId === id) {
          return {
            ...obj,
            isShow: val,
          };
        }
        return obj;
      })
      setListFilter(listFilter => {
        return {
          ...listFilter,
          type: {
            ...listFilter.type,
            items: newType
          }
        }
      });
    }
  }

  const handleCheckAll = (val) => {
    setCategoryAll(!val)
    setListFilter(prevState => {
      return {
        ...prevState,
        category: {
          ...listFilter.category,
          items: listFilter?.category?.items?.map(row => {
            return {
              ...row,
              isShow: !val
            }
          })
        }
      }
    })
  }

  useEffect(() => {
    let params = { limit: 10 }
    getDataJob(params)
  }, [])

  const getDataJob = (params) => {
    axiosPost(
      `v1/job/fetch`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      params,
      (success) => {
        setListJob(success.data.data)
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleFind = () => {
    let form = new FormData();
    listFilter.category.items.map((row, index) => row.isShow && form.append('categoryJobId[' + index + ']', row.categoryJobId))
    listFilter.type.items.map((row, index) => row.isShow && form.append('typeJobId[' + index + ']', row.typeJobId))
    form.append(`limit`, 10)
    form.append(`cityId`, cities.id)
    form.append(`keyword`, search)
    getDataJob(form)
  }

  return (
    <Layout title="Karir & Internship" >
      <SectionPath
        path={['Home', 'Karir & Intership']}
        className=" bg-gray-100"
      />      
      <JumbotronFooter
        title={listJob?.metadata?.headerName}
        desc={listJob?.metadata?.headerDesc}
      />
      <div className=" justify-center flex">
        <div className=" md:w-[85rem] md:flex py-4 px-6 md:px-0">
          <div className=" flex items-start justify-center md:w-80 md:py-20 md:border-r-2 md:space-y-8 md:block">
            <div className="w-1/2 md:w-full text-sm">
              <div className=" font-bold">Kategori</div>
              <div className=" mt-4 space-y-3">
                <div class="flex items-center">
                  <input
                    id={`checkbox-category-all`}
                    name={`checkbox-category-all`}
                    type="checkbox"
                    class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                    value=""
                    checked={categoryAll}
                    onClick={() => handleCheckAll(categoryAll)}
                  />
                  <label
                    for={`checkbox-category-all`}
                    class="ml-2 text-sm text-gray-500 cursor-pointer"
                  >
                    Semua
                  </label>
                </div>
                {listFilter?.category?.items?.map(row => (
                  <div class="flex items-center">
                    <input
                      id={`checkbox-category-${row.categoryJobId}`}
                      name={`checkbox-category-${row.categoryJobId}`}
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value={row.categoryJobId}
                      checked={row.isShow ? true : false}
                      onClick={() => handleCheckBox(row.categoryJobId, !row.isShow, 'category')}
                    />
                    <label
                      for={`checkbox-category-${row.categoryJobId}`}
                      class="ml-2 text-sm text-gray-500 cursor-pointer"
                    >
                      {row.categoryJobName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 md:w-full text-sm">
              <div className=" font-bold">Tipe</div>
              <div className=" mt-4 space-y-3">
                {listFilter?.type?.items?.map(row => (
                  <div
                    class="flex items-center"
                    key={row.typeJobId}
                  >
                    <input
                      id={`checkbox-type-${row.typeJobId}`}
                      name={`checkbox-type-${row.typeJobId}`}
                      type="checkbox"
                      class="w-4 h-4 accent-primary rounded bg-gray-100 border-gray-300 focus:ring-gray-500 "
                      value=""
                      checked={row.isShow ? true : false}
                      onClick={() => handleCheckBox(row.typeJobId, !row.isShow, 'type')}
                    />
                    <label
                      for={`checkbox-type-${row.typeJobId}`}
                      class="ml-2 text-sm text-gray-500 cursor-pointer"
                    >
                      {row.typeJobName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" flex flex-col space-y-4 md:py-20 md:px-8 w-full">
            <div className="  md:flex md:space-x-4">
              <div className=" border rounded w-full md:flex items-center hidden">
                <div className=" flex m-3 mx-4 items-center space-x-2 w-full">
                  <ICSearch />
                  <input
                    className=" focus:outline-none w-full border-r placeholder:text-sm disabled:bg-white"
                    placeholder="Cari nama profesi"
                    disabled={false}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className=" flex m-3 mx-4 items-center space-x-2 w-full relative">
                  <ICMapPinLine />
                  <div
                    className=" focus:outline-none text-sm w-full placeholder:text-sm disabled:bg-white cursor-pointer"
                    onClick={() => setShowCities(!showCities)}
                  >
                    {cities.name}
                  </div>
                  {showCities ? (
                    <div className=" absolute flex text-black bg-white border rounded flex-col top-9 -left-10 w-[29rem] h-60 overflow-auto">
                      {listFilter?.cities?.items?.map(row => (
                        <div
                          key={row.cityId}
                          className=" p-2 px-5 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setCities({ id: row.cityId, name: row.cityName })
                            setShowCities(false)
                          }}
                        >
                          {row.cityName}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <ICArrowDown />
                </div>
              </div>
              <button
                className=" w-full mt-6 md:mt-0 md:w-fit bg-primary p-3 px-12 font-bold text-black rounded border border-primary duration-300 hover:bg-white focus:outline-none"
                onClick={() => handleFind()}
              >
                Cari
              </button>
            </div>
            <div className=" text-gray-500 text-sm">Menampilkan {listJob?.items?.length} hasil</div>
            <div className=" flex flex-col space-y-4 ">
              {!loading && listJob?.items?.map(row => (
                <Link key={row.jobId} href={`/karir/${row.jobId}`} legacyBehavior>
                  <div className=" p-4 px-6 rounded border space-y-4 cursor-pointer">
                    <div className=" flex space-x-2 items-center">
                      <div className=" font-bold">{row.categoryJob.categoryJobName}</div>
                      <div className=" p-1 px-3 text-xs bg-[#FFEDAE] text-[#D69000] rounded">Remote</div>
                    </div>
                    <div className=" flex justify-between text-sm text-gray-500">
                      <div>{row.typeJob.typeJobName}</div>
                      <div className=" capitalize">{row.city.cityName} &nbsp;&nbsp;&nbsp; {row.appDateDif}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
export default karir