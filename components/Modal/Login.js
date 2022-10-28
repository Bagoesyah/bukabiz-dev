import { useState, createRef } from "react"
import Image from "next/image"
import axios from "axios"
import { GoogleLogin } from "react-google-login";

import { ButtonClose } from "@components/index"
import { useGet } from "@library/useAPI"
import { axiosPost } from "@library/useAxios"
import {
  setCookie,
  compress
} from "@library/useUtils"

import ICApple from "@assets/ICApple.svg"
import ICGoogle from "@assets/ICGoogle.svg"
import EyeOpen from "@assets/EyeOpen.svg"
import EyeClosed from "@assets/EyeClosed.svg"

// step 2 To Register
// step 3 To login

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [step, setStep] = useState('0')
  const [bg, setBg] = useState(null)
  const [categories, setCategories] = useState(false)
  const [type, setType] = useState(true)
  const [knowledgeLevel, setKnowledgeLevel] = useState(1)
  const [emailIsValidate, setEmailIsValidate] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [member, setMember] = useState(null)
  const [modalForgot, setModalForgot] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [doneRegis, setDoneRegis] = useState(false)
  const googleAccount = createRef();
  const {
    isData,
    isLoading,
    isError
  } = useGet('v1/auth-images')

  const {
    isData: listCategories,
    // isLoading,
    // isError
  } = useGet('v1/category/fetch', { params: { limit: 1000 } })

  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.name == 'email') handleValidateEmail()
      if (e.target.name == 'passwordLogin') handleLogin()
      if (e.target.name == 'passwordRegister') handleValidateRegister()
    }
  }
  const handleChangePass = (e) => setPass(e.target.value)
  const toggleType = () => setType(!type)

  // console.log('is', isData)
  const postParam = (step) => {
    if (pass === '') {
      return alert('password tidak boleh kosong')
    }
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', pass);
    let url = step == '2' ? 'v1/register' : 'v1/login'
    axios({
      method: "post",
      url: process.env.urlAPI + url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // console.log(response)
        if (step == '2') {
          setCategories(true)
          setBg(isData?.data[2].image)
          setMember(response.data.data.member.memberId)
        } else {
          let jsonUser = JSON.stringify({ ...response.data.data.member, 'token': response.data.data.token })
          setCookie(
            'user',
            compress(jsonUser)
          )
          window.location.reload()
        }

      })
      .catch(function (response) {
        if (response.request.status == 400) {
          alert(response.response.data.message)
        }
        if (response.request.status == 403) {
          alert(response.response.data.message)
        }
        if (response.request.status == 500) {
          console.log('bad request')
        }
      });
  }

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+(\.[0-9a-zA-Z]{2,})$/.test(email);
  };

  const handleValidateEmail = () => {
    // e.preventDefault()
    let isValid = false;
    if (email == '') {
      alert("Email harus diisi!")
      return false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Email not valid!");
      return false
    }

    if (isEmailValid(email)) {
      isValid = true
      var bodyFormData = new FormData();
      bodyFormData.append('email', email);
      axios({
        method: "post",
        url: process.env.urlAPI + 'v1/check-email',
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data.success === true) {
            setStep('2')
            setBg(isData?.data[1].image)
          }
        })
        .catch(function (response) {
          if (response.request.status == 400) {
            setStep('3')
            setBg(isData?.data[4].image)
          }
          if (response.request.status == 500) {
            console.log('bad request')
          }
        });
    }
    return isValid
  }

  const handleLogin = () => {
    postParam('3')
  }

  const handleValidateRegister = () => {
    postParam('2')
  }

  const handleSelectedCategories = (id) => {
    let tempArr = selectedCategories
    if (selectedCategories.includes(id)) {
      tempArr = tempArr.filter(ft => ft !== id)
    } else {
      tempArr.push(id)
    }
    setSelectedCategories([...tempArr])
  }

  const finalRegister = () => {
    let param = {
      categoryId: selectedCategories,
      knowledgeLevel
    }

    if (selectedCategories.length < 3) {
      alert('Anda belum memilih 3 kategori')
    } else if (selectedCategories.length > 10) {
      alert('Pilih maksimal 10 kategori')
    } else {
      axios.post(process.env.urlAPI + `v1/register/${member}`, param, {
        "headers": {
          "Accept": "application/json",
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          // console.log(response)
          // alert('registrasi berhasil')
          // window.location.reload()
          // setDoneRegis(true)
          setStep('1')
          setBg(isData?.data[3].image)
        })
        .catch(function (response) {
          console.log('submit fail', response)
        });
    }
  }


  const responseGoogle = (response) => {
    const data = {
      id_token: response.tokenId,
    };

    console.log('res google', data, response)
    // API.renos.registerGoogle.post(data).then((res) => {
    //   window.location.href = AppUrl.HOME;
    // });
  };

  const ButtonGoogle = () => {
    return (
      <div className="flex flex-row border items-center border-slate-300 rounded-lg gap-10 p-2 w-80 mb-2 cursor-pointer" onClick={() => alert('soon')}>
        <ICGoogle />
        <p className="text-center text-sm justify-center text-[#969696]">masuk dengan google</p>
      </div>
    )
  }
  const loaderPas = (src) => src

  const handleResendEmail = (email) => {
    axiosPost(
      `v1/resend-email`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      },
      {
        email: email
      },
      success => {
        alert(success.data.message)
      },
      error => {
        console.log(error);
        if (error.request.status == 400) {
          alert(error.data.message)
        }
      }
    )

  }

  // console.log({step})
  return (
    <div
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center`}
    >
      <div onClick={(e) => e.stopPropagation()}
        className=" bg-white w-4/6 h-5/6 rounded-xl relative"
      >
        <ButtonClose onClick={props.onClick} />
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col w-full h-full relative">
            <Image
              loader={loaderPas}
              src={bg ?? isData?.data[0].image}
              alt="dummy"
              // width={200}
              // height={200}
              unoptimized
              layout="fill"
              objectFit="content"
              className="rounded-l-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-between items-center w-full h-full">
            {step === '3' ? (
              <div className="flex flex-col justify-center mt-3 items-center w-full h-full">
                <div className="flex flex-col justify-center items-center" >
                  <div className="mb-3">
                    <label
                      className="block 
                      text-sm 
                      font-medium 
                      text-slate-700 
                      mb-1"
                    >
                      Email
                    </label>
                    <input
                      required
                      readOnly
                      className="border border-orange-200 w-80 rounded placeholder-slate-300 p-2 px-4 text-sm focus:outline-none"
                      placeholder="email@bukabiz.com"
                      value={email}
                      onChange={() => false}
                    />
                  </div>

                  <div className="mb-3 relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Kata sandi
                    </label>
                    <input
                      name="passwordLogin"
                      required
                      className="border border-orange-200 w-80 rounded placeholder-slate-300 p-2 px-4 text-sm focus:outline-none"
                      value={pass}
                      type={type ? 'password' : 'text'}
                      onChange={handleChangePass}
                      onKeyDown={handleKeyDown}
                    />
                    <button onClick={toggleType} className="cursor-pointer absolute right-3 top-7">
                      {type ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </div>

                  <div className="self-center">
                    <button
                      onClick={handleLogin}
                      type="submit"
                      className="text-center p-2 px-12 text-sm bg-black text-white rounded"
                    >
                      Lanjut
                    </button>
                  </div>
                </div>
                <p className="py-8 text-center underline cursor-pointer text-xs" onClick={props.openModalForgot}>Lupa kata sandi?</p>
                <div className="text-center text-xs text-gray-500 px-6 bottom-7 absolute">
                  Dengan mendaftar ke Bukabiz.com, Anda menyetujui kebijakan privasi Bukabiz untuk menyimpan, mengelola, dan memproses informasi pribadi Anda. Untuk membaca lebih lanjut, silakan lihat <span className="text-blue-500">kebijakan privasi kami di sini.</span>
                </div>
              </div>
            ) : (step === '2') ? (
              <div className="flex flex-col justify-center mt-3 items-center w-full h-full">
                {categories ? (
                  <div className="flex flex-col px-8">
                    <p className="text-center mb-4">
                      Selangkah lagi! Hampir selesai. Sekarang kamu bisa <br />pilih <b>preferensi bisnis</b> yang kamu suka di sini.
                    </p>
                    <small className="text-neutral-400 mb-2 text-center">Level pemahamanmu soal bisnis</small>
                    <div className="grid grid-cols-4 gap-1 mb-3 whitespace-nowrap cursor-pointer text-slate-900  text-xs text-center">
                      <div className={`${knowledgeLevel === 1 && 'bg-primary '} btn-rounded text-white `} onClick={() => setKnowledgeLevel(1)}>
                        Nol Banget
                      </div>
                      <div className={`${knowledgeLevel === 2 && 'bg-primary '} btn-rounded text-white `} onClick={() => setKnowledgeLevel(2)}>
                        Pemula
                      </div>
                      <div className={`${knowledgeLevel === 3 && 'bg-primary '} btn-rounded text-white `} onClick={() => setKnowledgeLevel(3)}>
                        Lumayan
                      </div>
                      <div className={`${knowledgeLevel === 4 && 'bg-primary '} btn-rounded text-white `} onClick={() => setKnowledgeLevel(4)}>
                        Mahir
                      </div>
                    </div>
                    <div className="border border-slate-200 w-full my-6" />
                    <small className="text-neutral-400 mb-4 text-center">Kamu bisa memilih minimal 3 kategori lho. </small>
                    <div className='overflow-y-auto h-72 preferensi-scroll'>
                      <div className="grid grid-cols-4 gap-1 mb-3">
                        {listCategories?.data?.items.map(list => (
                          <div
                            className=" p-2"
                            key={list.articleCategoryId}
                            onClick={() => handleSelectedCategories(list.articleCategoryId)}
                          >
                            <div className="w-20
                              text-center 
                              items-center 
                              flex 
                              flex-col 
                              space-y-2 
                              cursor-pointer"
                            >
                              <div className={`rounded-full 
                                w-16
                                h-16
                                justify-center 
                                items-center 
                                flex 
                                border 
                                border-primary 
                                hover:bg-primary 
                                duration-300
                                ${selectedCategories.includes(list.articleCategoryId) ? 'bg-primary' : 'bg-transparent'}
                              `}>
                                <Image
                                  loader={loaderPas}
                                  src={list.urlFile}
                                  alt={list.altFeaturedImage}
                                  width={35}
                                  height={35}
                                  unoptimized
                                />
                              </div>
                              <p className=" text-gray-500 text-xs">{list.articleCategoryTitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="self-center mt-5 w-full">
                      <button
                        onClick={finalRegister}
                        type="btn"
                        className=" text-center p-2 w-full text-sm bg-black text-white rounded ">
                        Lanjutkan
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className=" text-sm">Daftar sebagai <span className="font-bold mb-6">{email}</span></p>
                    <div
                      className="flex 
                      flex-col 
                      justify-center 
                      items-center 
                      mt-4"
                    >
                      <label className="block mb-3 relative">
                        <span
                          className="block 
                            text-sm 
                            font-medium 
                            text-slate-700 
                            mb-1
                          ">
                          Buat kata sandi
                        </span>
                        <input
                          name="passwordRegister"
                          required
                          className="border border-orange-200 w-80 rounded placeholder-slate-300 p-2 px-4 text-sm focus:outline-none"
                          value={pass}
                          type={type ? 'password' : 'text'}
                          onChange={handleChangePass}
                          onKeyDown={handleKeyDown}
                        />
                        <button onClick={toggleType} className="cursor-pointer absolute right-3 top-7">
                          {type ? <EyeClosed /> : <EyeOpen />}
                        </button>
                      </label>

                      <div className="self-center">
                        <button
                          onClick={handleValidateRegister}
                          type="btn"
                          className="text-center p-2 px-12 text-sm bg-black text-white rounded"
                        >
                          Lanjutkan
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (step === '1') ? (
              <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
                <p className=' text-center px-12 text-sm'>Yeay! Sudah selesai. Kami baru saja kirimkan email ke <b>{email}</b> untuk konfirmasi akunmu</p>
                <p className="py-2 text-center cursor-pointer text-xs" >Belum terima link? <a onClick={() => handleResendEmail(email)} className=" font-bold underline">kirim ulang</a></p>
                <div className="self-center">
                  <button
                    onClick={() => window.location.reload()}
                    type="btn"
                    className="text-center p-2 px-12 text-sm bg-black text-white rounded">
                    Selesai
                  </button>
                </div>
                <div className="text-center text-xs text-gray-500 px-6 bottom-7 absolute">
                  Dengan mendaftar ke Bukabiz.com, Anda menyetujui kebijakan privasi Bukabiz untuk menyimpan, mengelola, dan memproses informasi pribadi Anda. Untuk membaca lebih lanjut, silakan lihat <span className="text-blue-500">kebijakan privasi kami di sini.</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center w-full h-1/2">
                  <div>
                    <div className="flex flex-row border items-center border-slate-300 rounded-lg gap-10 p-2 w-80 mb-2 cursor-pointer" onClick={() => alert('soon')}>
                      <ICApple />
                      <p className="text-center text-sm justify-center text-[#969696]">masuk dengan apple</p>
                    </div>
                    {/* <div className="flex flex-row border items-center border-slate-300 rounded-lg gap-10 p-2 w-80 mb-2"> */}
                    <GoogleLogin
                      render={(renderProps) => (
                        <ButtonGoogle
                          {...renderProps}
                          ref={googleAccount}
                          // lefticon={ICGoogle}
                          // width={"100%"}
                          // size={"btn-lg"}
                          // variant={"btn-secondary"}
                          label={"Google"}
                        />
                      )}
                      clientId="AIzaSyBxy1pzMuv0VNd_z1RkaAGS5bpZxTVBQk0"
                      buttonText="Google"
                      onSuccess={responseGoogle}
                      onFailure={() => console.log('errorGoogle')}
                      cookiePolicy={"single_host_origin"}
                    />
                    {/* </div> */}
                  </div>
                </div>
                <div className="border-b-2 border-gray-200 w-full" />
                <div className="flex flex-col justify-center items-center w-full h-4/5">
                  <div className="flex flex-col justify-center items-center">
                    <p className=" text-sm">atau dengan email aja</p>
                    <div className="flex flex-col justify-center items-center mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          name="email"
                          required
                          className="border border-orange-200 w-80 rounded placeholder-slate-300 p-2 px-4 text-sm focus:outline-none"
                          placeholder="email@bukabiz.com"
                          value={email}
                          onChange={handleChangeEmail}
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      <div className="self-center mt-2">
                        <button
                          onClick={handleValidateEmail}
                          className="text-center p-2 px-12 text-sm bg-black text-white rounded">
                          Masuk
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 px-6 mt-12">
                    Dengan mendaftar ke Bukabiz.com, Anda menyetujui kebijakan privasi Bukabiz untuk menyimpan, mengelola, dan memproses informasi pribadi Anda. Untuk membaca lebih lanjut, silakan lihat <span className="text-blue-500">kebijakan privasi kami di sini.</span>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

const RenderDoneRegistration = ({ bg, isData }) => {
  const loaderPas = (src) => src
  return (
    <div
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center`}
    >
      <div onClick={(e) => e.stopPropagation()} className=" bg-white w-4/6 h-5/6 rounded-xl relative">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col w-full h-full relative">
            <Image
              loader={loaderPas}
              src={bg ?? isData?.data[0].image}
              alt="dummy"
              width={200}
              height={200}
              unoptimized
              layout="fill"
              objectFit="content"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-between items-center w-full h-full">
            <p>tes</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login

