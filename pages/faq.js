import { useEffect, useState } from "react"

import { axiosGet } from "@library/useAxios"
import {
  Layout,
  SectionPath,
  JumbotronFooter
} from '@components/index'

function faq() {
  const [loading, setLoading] = useState(true)
  const [question, setQuestion] = useState([])

  useEffect(() => getData(), [])

  const getData = () => {
    axiosGet(
      'v1/faq/fetch',
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setLoading(false)
        setQuestion((prevState) => {
          return {
            ...prevState,
            ...success.data.data,
            items: success.data.data.items.map(row => {
              return {
                ...row,
                // isShow: false,
                sub: row.sub.map(row2 => {
                  return {
                    ...row2,
                    isShow: false
                  }
                })
              }
            }),
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleCollapse = (id, index) => {
    const newQuestion = question.items.map((obj) => {
      if (obj.faqParentId === id) {
        const newListQuestion = obj.sub.map((obj2) => {
          if (obj2.faqSubId === index) {
            return {
              ...obj2,
              isShow: !obj2.isShow,
            };
          }
          else {
            return {
              ...obj2,
            };
          }
        });
        return {
          ...obj,
          sub: newListQuestion,
        };
      }
      return obj;
    });

    setQuestion(prevState => {
      return {
        ...prevState,
        items: newQuestion
      }
    });

  }

  return (
    <Layout title="Faq" >
      <SectionPath
        path={['Home', 'Faq']}
        className=" bg-gray-100"
      />
      <JumbotronFooter
        title={question?.metadata?.headerName}
        desc={question?.metadata?.headerDesc}
      />
      <div className="justify-center md:flex ">
        <div className=" md:w-[85rem] md:py-20 md:space-y-12 sm:py-4 py-4 px-4 md:px-0" >
          {!loading && question?.items?.map(q => (
            <div key={q.faqParentId} className=" flex flex-col md:flex-row item-center">
              <div className="md:text-xl md:font-bold md:w-80 py-3 font-bold">{q.faqParentTitle}</div>
              <div>
                {q.sub.map(sq => (
                  <div
                    className=" p-2 py-3 border-b-2 md:w-[50rem]"
                    onClick={() => handleCollapse(q.faqParentId, sq.faqSubId, !sq.isShow)}
                  >
                    <div className=" flex space-x-4 items-center cursor-pointer" >
                      <div className=" text-primary text-2xl w-3">{sq.isShow ? '-' : '+'}</div>
                      <div className=" md:text-xl font-bold ">{sq.question}</div>
                    </div>
                    {sq.isShow ? (
                      <div className={` text-gray-500 pl-7 pt-2 transition-all`}>
                        {sq.answer}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
export default faq