import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { setCookie, getCookie, compress, decompress } from "@library/useUtils";
import { axiosPost } from "@library/useAxios";
import ContainerProfile from "@components/ContainerProfile";

import Pencil from "@assets/Pencil.svg";
import Camera from "@assets/Camera.svg";
import ICEyeOpen from "@assets/EyeOpen.svg";
import ICEyeClosed from "@assets/EyeClosed.svg";

function detail() {
  const router = useRouter();
  const inputFile = useRef();
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [member, setMember] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      let dataProfile = JSON.parse(decompress(user));
      setMember(dataProfile);
      setProfile({
        memberId: dataProfile.memberId,
        name:
          dataProfile.email === dataProfile.name
            ? dataProfile.email.split("@")[0]
            : dataProfile.name,
        memberDob: dataProfile.memberDob,
        memberDobText: "1 Januari 1970",
        phone: dataProfile.phone,
        gender: dataProfile.gender,
        image: dataProfile.image,
        newImage: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      router.push("/");
    }
    setLoading(false);
  }, []);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    let image = "";
    if (name === "newImage") {
      image = {
        url: URL.createObjectURL(files[0]),
        file: files[0],
      };
    }
    setProfile({
      ...profile,
      [name]: name !== "newImage" ? value : image,
    });
  };

  const handleSubmit = () => {
    setLoadingUpdate(true);

    let formData = new FormData();
    formData.append("name", profile.name);
    formData.append("gender", profile.gender);
    formData.append("member_dob", profile.memberDob);
    formData.append("phone", profile.phone);
    formData.append("image", profile.newImage.file);
    axiosPost(
      `v1/update-myprofile`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      formData,
      (success) => {
        let jsonUser = JSON.stringify({
          ...success.data.data,
          token: member.token,
        });
        setCookie("user", compress(jsonUser));
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleUpdatePass = () => {
    if (profile.oldPassword === "") return alert("Kata sandi lama harus diisi");
    if (profile.newPassword === "") return alert("Kata sandi baru harus diisi");
    if (profile.confirmPassword === "")
      return alert("Konfirmasi kata sandi harus diisi");
    if (profile.confirmPassword !== profile.newPassword)
      return alert("Kata sandi tidak sama");
    setLoadingUpdate(true);
    axiosPost(
      `v1/update-password`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        old_password: profile.oldPassword,
        new_password: profile.newPassword,
        new_password_confirmation: profile.confirmPassword,
      },
      (success) => {
        alert(success.data.message);
        setEditPassword(false);
        setProfile((preState) => {
          return {
            ...preState,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          };
        });
      },
      (error) => {
        console.log(error);
        if (error.status == 400) return alert(error.data.message);
      }
    );
  };

  if (member && !loading) {
    const loader = ({ src }) => member.image;
    return (
      <ContainerProfile {...member}>
        <div className=" flex flex-col md:w-9/12">
          <div className=" p-6 px-8 hidden md:flex justify-between items-center border-b-2 border-gray-200">
            <div className=" text-2xl font-bold">Tentang Saya</div>
            {!edit ? (
              <button
                onClick={() => setEdit(!edit)}
                className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
              >
                <Pencil />
                <span>Ubah Profil</span>
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                className=" p-2 px-8 text-sm font-bold bg-primary border border-primary rounded hover:shadow-lg"
              >
                {loadingUpdate ? "Loading.." : "Simpan"}
              </button>
            )}
          </div>
          <div className=" flex- flex-col p-4 md:p-6 md:px-8 pb-40">
            <div className=" text-xl font-bold">Photo Profil</div>
            <div className=" flex mt-4">
              {!edit ? (
                <div className="w-20 md:w-48">
                  <Image
                    src={member.image}
                    loader={loader}
                    alt={profile.name}
                    width={125}
                    height={125}
                    className=" rounded-full object-cover"
                  />
                </div>
              ) : (
                <>
                  <div className="w-20 md:w-48">
                    <Image
                      src={
                        profile.newImage === ""
                          ? profile.image
                          : profile.newImage.url
                      }
                      loader={loader}
                      alt={profile.name}
                      width={125}
                      height={125}
                      className=" rounded-full object-cover"
                    />
                  </div>
                  <div className=" flex flex-col justify-between">
                    <div className=" text-xs text-gray-500 ml-4 md:ml-0">
                      Maksimum 1 Mb. Ekstensi file yang diperbolehkan : <br />
                      .JPG .JPEG .PNG
                    </div>
                    <div className=" hidden md:flex">
                      <input
                        type="file"
                        name="newImage"
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        ref={inputFile}
                        onChange={handleOnChange}
                      />
                      {profile.newImage !== "" ? (
                        <div className=" flex items-center">
                          <button
                            className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
                            onClick={() =>
                              setProfile({ ...profile, newImage: "" })
                            }
                          >
                            <span>Remove</span>
                          </button>
                          <span className=" ml-2 text-xs text-gray-500">
                            {profile.newImage.file.name}
                          </span>
                        </div>
                      ) : (
                        <button
                          className=" p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
                          onClick={() => inputFile.current.click()}
                        >
                          <Camera />
                          <span>Upload</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            {edit && (
              <div className=" mt-4 md:hidden">
                <input
                  type="file"
                  name="newImage"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  ref={inputFile}
                  onChange={handleOnChange}
                />
                {profile.newImage !== "" ? (
                  <div className=" flex flex-col items-center">
                    <button
                      className=" p-2 px-4 w-full text-sm font-bold border border-black rounded flex items-center justify-center space-x-2 hover:shadow-lg"
                      onClick={() => setProfile({ ...profile, newImage: "" })}
                    >
                      <span>Remove</span>
                    </button>
                    <span className=" mt-2 text-xs text-gray-500">
                      {profile.newImage.file.name}
                    </span>
                  </div>
                ) : (
                  <button
                    className=" p-2 px-4 w-full text-sm font-bold border border-black rounded flex items-center justify-center space-x-2 hover:shadow-lg"
                    onClick={() => inputFile.current.click()}
                  >
                    <Camera />
                    <span>Upload</span>
                  </button>
                )}
              </div>
            )}
            <div className=" mt-8 text-xl font-bold">Data Diri</div>
            <div className=" mt-4 space-y-4">
              <div className=" flex items-center">
                <div className=" w-36 md:w-48 text-gray-500">Nama</div>
                {!edit ? (
                  <div>{profile.name}</div>
                ) : (
                  <input
                    type="text"
                    name="name"
                    className=" p-2 px-4 w-full text-sm bg-gray-100 border rounded focus:outline-none"
                    value={profile.name}
                    onChange={handleOnChange}
                  />
                )}
              </div>
              <div className=" flex items-center">
                <div className=" w-36 md:w-48 text-gray-500">Tanggal Lahir</div>
                {!edit ? (
                  <div>
                    {profile.memberDob === "1970-01-01"
                      ? "-"
                      : profile.memberDob}
                  </div>
                ) : (
                  <input
                    type="date"
                    name="memberDob"
                    className=" p-2 px-4 w-full text-sm bg-gray-100 border rounded focus:outline-none"
                    date-format="dd-mm-yyyy"
                    value={profile.memberDob}
                    onChange={handleOnChange}
                  />
                )}
              </div>
              <div className=" flex items-center">
                <div className=" w-36 md:w-48 text-gray-500">Jenis Kelamin</div>
                {!edit ? (
                  <div>
                    {profile.memberDob === "1970-01-01"
                      ? "-"
                      : profile.gender === 1
                      ? "Laki - Laki"
                      : "Wanita"}
                  </div>
                ) : (
                  <select
                    type="text"
                    name="gender"
                    className="p-2 px-4 w-full text-sm bg-gray-100 border rounded focus:outline-none"
                    value={profile.gender}
                    onChange={handleOnChange}
                  >
                    <option
                      value={1}
                      selected={profile.gender === 1 ? true : false}
                    >
                      Laki - Laki
                    </option>
                    <option
                      value={2}
                      selected={profile.gender === 2 ? true : false}
                    >
                      Wanita
                    </option>
                  </select>
                )}
              </div>
            </div>
            <div className=" mt-8 text-xl font-bold">Kontak</div>
            <div className=" mt-4 space-y-4">
              <div className=" flex items-center">
                <div className=" w-36 md:w-48 text-gray-500">Email</div>
                {!edit ? (
                  <div>{member.email}</div>
                ) : (
                  <input
                    className=" p-2 px-4 w-full text-sm bg-gray-100 border rounded focus:outline-none cursor-not-allowed"
                    value={member.email}
                    disabled={true}
                  />
                )}
              </div>
              <div className=" flex items-center">
                <div className=" w-36 md:w-48 text-gray-500">Nomor HP</div>
                {!edit ? (
                  <div>{profile.phone ? profile.phone : "-"}</div>
                ) : (
                  <input
                    type="number"
                    name="phone"
                    className=" p-2 px-4 w-full text-sm bg-gray-100 border rounded focus:outline-none"
                    value={profile.phone}
                    onChange={handleOnChange}
                  />
                )}
              </div>
              {!edit ? (
                !editPassword ? (
                  <div className=" flex items-center">
                    <div className=" w-36 md:w-48 text-gray-500">
                      Kata Sandi
                    </div>
                    <div
                      className=" text-primary cursor-pointer"
                      onClick={() => setEditPassword(!editPassword)}
                    >
                      Ubah
                    </div>
                  </div>
                ) : (
                  <>
                    <div className=" flex items-center ">
                      <div className=" w-40 md:w-48 text-gray-500">
                        Kata Sandi Lama
                      </div>
                      <div className=" relative items-center flex">
                        <input
                          type={showOldPass ? "text" : "password"}
                          name="oldPassword"
                          className=" p-2 px-4 pr-12 w-60 text-sm bg-gray-100 border rounded focus:outline-none"
                          value={profile.oldPassword}
                          onChange={handleOnChange}
                        />
                        <button
                          className=" absolute right-3"
                          onClick={() => setShowOldPass(!showOldPass)}
                        >
                          {!showOldPass ? <ICEyeClosed /> : <ICEyeOpen />}
                        </button>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-40 md:w-48 text-gray-500">
                        Kata Sandi Baru
                      </div>
                      <div className=" relative items-center flex">
                        <input
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          className=" p-2 px-4 pr-12 w-60 text-sm bg-gray-100 border rounded focus:outline-none"
                          value={profile.newPassword}
                          onChange={handleOnChange}
                        />
                        <button
                          className=" absolute right-3"
                          onClick={() => setShowNewPass(!showNewPass)}
                        >
                          {!showNewPass ? <ICEyeClosed /> : <ICEyeOpen />}
                        </button>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-40 md:w-48 text-gray-500">
                        Konfirmasi Kata Sandi
                      </div>
                      <div className=" relative items-center flex">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          name="confirmPassword"
                          className=" p-2 px-4 pr-12 w-60 text-sm bg-gray-100 border rounded focus:outline-none"
                          value={profile.confirmPassword}
                          onChange={handleOnChange}
                        />
                        <button
                          className=" absolute right-3"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                        >
                          {!showConfirmPass ? <ICEyeClosed /> : <ICEyeOpen />}
                        </button>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-40 md:w-48 text-gray-500"></div>
                      <button
                        // onClick={() => {
                        //   alert("Soon!")
                        //   setEditPassword(!editPassword)
                        // }}
                        onClick={() => handleUpdatePass()}
                        className="p-2 px-8 text-sm font-bold bg-primary border border-primary rounded hover:shadow-lg"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditPassword(!editPassword)}
                        className="ml-2 p-2 px-4 text-sm font-bold border border-black rounded flex items-center space-x-2 hover:shadow-lg"
                      >
                        Batal
                      </button>
                    </div>
                  </>
                )
              ) : null}

              <div className=" flex items-center md:hidden">
                {!edit ? (
                  <button
                    onClick={() => setEdit(!edit)}
                    className=" mt-8 p-2 px-4 w-full text-sm font-bold border border-black rounded flex items-center justify-center space-x-2 hover:shadow-lg"
                  >
                    <Pencil />
                    <span>Ubah Profil</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit()}
                    className=" mt-8 p-2 px-8 w-full text-sm font-bold bg-primary border border-primary rounded hover:shadow-lg"
                  >
                    {loadingUpdate ? "Loading.." : "Simpan"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerProfile>
    );
  }
}
export default detail;
