import { useState } from "react";
import axios from "axios";

import { setCookie, compress } from "@library/useUtils";
import { ButtonClose } from "@components/index";
import { Otp } from "@components/Modal/index";

import ICLogo from "@assets/Logo.svg";
import EyeOpen from "@assets/EyeOpen.svg";
import EyeClosed from "@assets/EyeClosed.svg";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formOtp, setFormOtp] = useState(false);
  const [formNewPass, setFormNewPass] = useState(false);
  const [pass, setPass] = useState("");
  const [passVerify, setPassVerify] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const checkEmail = () => {
    if (email == "") {
      alert("Email harus diisi!");
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Email not valid!");
      return false;
    }

    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    setLoading(true);
    axios({
      method: "post",
      url: process.env.urlAPI + "v1/forgot-password",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        alert("Reset password berhasil dikirimkan.");
        setLoading(false);
        setFormOtp(true);
        setEmail(email);
      })
      .catch(function (res) {
        setLoading(false);
        if (res.request.status == 400) {
          alert(res.response.data.message);
        }
        if (res.response.status === 500) {
          console.log("bad request");
          alert(res.response.data.message);
        }
      });
  };

  const checkOtp = (val) => {
    if (val === true) {
      setFormOtp(false);
      setFormNewPass(val);
    }
  };

  const submit = () => {
    if (pass === "") return alert("Kata sandi baru harus diisi!");
    if (passVerify === "") return alert("Ulangi kata sandi harus diisi!");
    if (pass !== passVerify) return alert("Kata sandi tidak sama!");

    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", pass);
    bodyFormData.append("password_confirmation", passVerify);

    axios({
      method: "post",
      url: process.env.urlAPI + "v1/reset-password",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (res) {
        if (res.data.success === true) {
          alert(res.data.message);
          login();
        }
      })
      .catch(function (res) {
        console.log("res", res);
        if (res.request.status == 400) {
          alert(res.response.data.message);
        }
        if (res.response.status === 500) {
          console.log(res);
        }
        // if (res.response.status === 500) {
        //   console.log('bad request')
        //   alert(res.response.data.message)
        //   setLoading(false)
        // }
      });
  };

  const login = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", pass);
    axios({
      method: "post",
      url: process.env.urlAPI + "v1/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setCookie("user", compress(JSON.stringify(response.data.data.member)));
        window.location.reload();
      })
      .catch(function (response) {
        if (response.request.status == 500) {
          console.log("bad request");
        }
      });
  };

  return (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative w-11/12 h-3/4 md:h-[31rem] md:w-[45rem]"
      >
        <ButtonClose onClick={props.onClick} />
        <div className=" p-8 md:p-12 md:px-24 flex flex-col items-center">
          {formOtp ? (
            <Otp
              onClick={props.onClick}
              setFormNewPass={(val) => checkOtp(val)}
              email={email}
            />
          ) : formNewPass ? (
            <>
              <div className=" mt-12 text-2xl">Atur ulang kata sandi</div>
              <div className=" text-gray-400 text-sm font-light text-center mt-2">
                Masukan Kata Sandi Baru
              </div>
              <div className=" flex flex-col mt-4 relative">
                <label className=" text-sm ml-2">Kata Sandi Baru</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="p-3 
                  px-4 
                  w-80 
                  text-sm 
                  border 
                  rounded 
                  focus:outline-none"
                  placeholder="Masukan kata sandi"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute right-3 top-7"
                >
                  {showPass ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
              <div className=" flex flex-col mt-4 relative">
                <label className=" text-sm ml-2">Ulangi Kata Sandi</label>
                <input
                  type={showRePass ? "text" : "password"}
                  className="p-3 
                  px-4 
                  w-80 
                  text-sm 
                  border 
                  rounded 
                  focus:outline-none"
                  placeholder="Ulangi kata sandi"
                  value={passVerify}
                  onChange={(e) => setPassVerify(e.target.value)}
                />
                <button
                  onClick={() => setShowRePass(!showRePass)}
                  className="cursor-pointer absolute right-3 top-7"
                >
                  {showRePass ? <EyeClosed /> : <EyeOpen />}
                </button>
              </div>
              <div className=" flex space-x-4 mt-5">
                <div
                  className=" py-2 px-12 text-white text-sm font-bold bg-black rounded cursor-pointer"
                  onClick={submit}
                >
                  Simpan
                </div>
              </div>
              <div className=" mt-20 text-sm font-light text-gray-400">
                Butuh bantuan? Kunjungi bagian{" "}
                <span className=" text-black">Bantuan Kami</span> atau{" "}
                <span className=" text-black">Hubungi Kami</span>.
              </div>
            </>
          ) : (
            <>
              <ICLogo />
              <div className="mt-12 text-2xl">Atur ulang kata sandi</div>
              <div className=" text-gray-400 text-sm font-light text-center mt-2">
                Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode
                verifikasi
                <br />
                untuk atur ulang kata sandi.
              </div>
              <div className=" flex flex-col mt-4">
                <label className=" text-sm ml-2">Email</label>
                <input
                  className="p-3 
                  px-4 
                  w-80 
                  text-sm 
                  border 
                  rounded 
                  focus:outline-primary"
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" flex space-x-4 mt-5">
                <div
                  className=" py-2 px-12 text-white text-sm font-bold bg-black cursor-pointer rounded"
                  onClick={checkEmail}
                >
                  {loading ? "loading ..." : "Lanjut"}
                </div>
                <div
                  className=" py-2 px-12 text-white text-sm font-bold bg-gray-500 cursor-pointer rounded"
                  onClick={props.onClick}
                >
                  Batal
                </div>
              </div>
              <div className=" mt-32 md:mt-20 text-sm font-light text-gray-400">
                Butuh bantuan? Kunjungi bagian{" "}
                <span className=" text-black">Bantuan Kami</span> atau{" "}
                <span className=" text-black">Hubungi Kami</span>.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
