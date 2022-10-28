import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from 'next/router'

import {
  Layout,
  Container,
  SectionCategory,
  CardHits,
  Modal,
  Dangerously,
} from "@components/index"
import {
  ICShare,
  ICBookmark,
  ICUser,
  ICEye,
  ICCalender,
} from "public/assets";

const Article = (props) => {
  const { category, articleDetail, hits, likes } = props
  // const category = Array.from({ length: 21 })
  const router = useRouter()
  const loaderPas = (src) => src
  const loaderHits = ({ src }) => src
  const [popup, setPopup] = useState(false)
  const [featured, setFeatured] = useState('image')
  const [data, setData] = useState({})

  async function loadData(id) {
    const api = await fetch(process.env.urlAPI + `v1/article/pop-up/${id}`)
    const result = await api.json()

    if (result.success) return setData(result.data)
    if (!result.success) return false
  }

  const handleClick = (id, featured) => {
    if (featured === 'video') {
      setFeatured(featured)
      loadData(id);
      setPopup(true)
    } else {
      router.push(`/article/${id}`)
    }
  };

  useEffect(() => {
    setPopup(false)
  }, [router.query.id])

  return (
    <Layout title="Article">
      <SectionCategory />
      <div className="pt-20">
        <section
          className="bg-gray-100 
          flex 
          justify-center 
          py-12"
        >
          <Container>
            <div className="flex flex-col tracking-wide w-4/6">
              <h1 className="text-5xl font-bold mb-6">
                {articleDetail.articleTitle}
              </h1>
              <div className="flex items-center opacity-70 gap-2 mb-3">
                <ICUser />
                <p>{articleDetail.authorName}</p>
                <ICCalender />
                <p>{articleDetail.tanggal}</p>
                <ICEye />
                <p>{articleDetail.articleVisited} kali</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-2 flex flex-col">
                <div className="flex flex-col">
                  {articleDetail.featured === 'video' ? (
                    <iframe
                      className="w-full aspect-video rounded-tl-lg mb-3"
                      src={articleDetail.featuredFile}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      className="rounded object-cover"
                      src={articleDetail.urlImageLong}
                      loader={() => loaderPas(articleDetail.urlImageLong)}
                      alt="Hits1"
                      width={600}
                      height={600}
                    />
                  )}
                  <div className="flex gap-4 justify-between p-3">
                    <div className="flex flex-wrap gap-3">
                      {articleDetail.articleTagName.map((item, i) => (
                        <div
                          key={i}
                          className="border-2 
                          p-2 
                          capitalize 
                          text-center 
                          tracking-wide
                          border-current"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 grow-1 cursor-pointer">
                      <ICShare />
                      <ICBookmark />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-4 mr-6 tracking-wide">
                  <Dangerously content={articleDetail?.articleContent} />
                </div>
                <br />
                <div className=" border-b-2 border-[#949494B2]" />
                {articleDetail?.articleMirip?.length > 0 && (
                  <h3 className="py-4 text-4xl font-bold">`HowTo`Lain Yang Mirip</h3>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {articleDetail.articleMirip.slice(0, 4).map(item => (
                    <CardHits
                      data={item}
                      onClick={() => handleClick(item.articleId, item.featured)}
                      key={item.articleId}
                      featured={item.featured}
                      image={item.urlImageSquare}
                      title={item.articleTitle}
                      alt={item.altFeaturedFile}
                      desc={item.shortDescription}
                      isDetail={true}
                    />
                  ))}
                </div>
              </div>

              {/* h-4/6 scroll-smooth overflow-y-scroll */}
              <div className="flex flex-col">
                {/* <div className={`bg-white flex flex-col drop-shadow-xl rounded-r-lg rounded-bl-lg ${articleDetail.featured === 'video' && 'mb-8'} `}>
                  {articleDetail.featured === 'video' && (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-3 p-4 capitalize cursor-pointer item-start hover:bg-amber-100">
                        <iframe
                          className="w-44 aspect-video rounded"
                          src={articleDetail.featuredFile}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="grow-1">
                          <p>menyelesaikan urusan keuangan </p>
                        </div>
                        <ICElipsis className="mt-1" />
                      </div>
                    ))
                  )}

                </div> */}
                {/* {articleDetail?.articleMirip?.length > 0 && ( */}
                <div className={`bg-white flex flex-col drop-shadow-xl rounded p-6 mb-8 ${articleDetail.featured === 'video' ? ' ' : 'ml-8'}`}>
                  <h1 className="text-3xl font-bold mb-6 capitalize">
                    yang lagi hits
                  </h1>
                  {hits?.items?.map((list, i) => (
                    <div
                      key={list.articleId}
                      className="flex tracking-wide mb-3 cursor-pointer"
                      onClick={() => handleClick(list.articleId, list.featured)}
                    >
                      <div className="cursor-pointer">
                        <Image
                          className="rounded object-cover"
                          src={list.urlImageSquare}
                          loader={() => loaderPas(list.urlImageSquare)}
                          alt="Hits1"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex flex-col px-2">
                        <p className="font-bold"> {list.articleTitle.slice(0, 25)} ...</p>
                        <div className="text-sm">{list.shortDescription.slice(0, 55)} ...</div>
                      </div>
                    </div>
                  ))}

                  <div className="border-2 border-slate-100 my-8" />

                  <h1 className="text-3xl font-bold mb-6 capitalize">
                    mungkin kamu suka
                  </h1>

                  <div className="grid grid-cols-2 gap-3">
                    {likes?.items?.map(list => (
                      <div
                        className="flex space-x-16"
                        key={list.articleId}
                        onClick={() => handleClick(list.articleId, list.featured)}
                      >
                        <div className="relative flex cursor-pointer">
                          <Image
                            loader={loaderHits(list.urlImageSquare)}
                            src={list.urlImageSquare}
                            unoptimized
                            width={180}
                            height={180}
                            objectFit='cover'
                            className="object-cover rounded-xl z-10"
                          />
                          <div
                            className="flex 
                              flex-col 
                              z-50 
                              p-3 
                              justify-end 
                              items-end 
                              rounded-xl 
                              absolute 
                              h-full 
                              w-full 
                              text-xs 
                              text-white 
                              font-semibold
                              capitalize
                              tracking-wide"
                            style={{ backgroundColor: '#403b3b5e' }}
                          >
                            <p className="drop-shadow-lg">{list.articleTitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                {/* )} */}
              </div>

            </div>
          </Container>
        </section>
      </div>

      {popup && (
        <Modal
          variant={featured}
          content={data.urlFile}
          title={data.articleTitle}
          category={data.articleCategoryTitle}
          desc={data.articleContent}
          data={data}
          articleId={data?.articleId}
          onClick={() => setPopup(false)}
        />
      )}
    </Layout>
  )
}

export async function loadData(url) {
  const api = await fetch(process.env.urlAPI + url)
  const result = await api.json()

  if (result.success) return result.data
  if (!result.success) return false
}

export async function getServerSideProps(router) {
  const category = await loadData('v1/category/fetch?limit=25')
  const articleDetail = await loadData(`v1/article/detail-article/${router.query.id}`)
  const hits = await loadData('v1/article/hits-article?limit=4')
  const likes = await loadData('v1/article/pas-untuk-kamu?limit=4')

  return {
    props: {
      category,
      articleDetail,
      hits,
      likes
    },
  }
}

export default Article