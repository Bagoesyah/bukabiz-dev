import Image from "next/image";
import { useRouter } from "next/router";
import { deleteAllCookies } from "@library/useUtils";

import Layout from "@components/Layout";
import SectionPath from "@components/SectionPath";

function ContainerProfile({ children, image, name, email }) {
  const router = useRouter();
  const loader = ({ src }) => image;

  const handleLogout = () => {
    deleteAllCookies();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  function MenuView({ onClick, link, label }) {
    return (
      <div
        onClick={onClick}
        className={` 
           border-b-2 pb-2 md:border-l-4 md:border-b-0 md:pl-4 text-sm md:text-lg cursor-pointer  
          ${
            router.asPath === link
              ? " font-bold border-primary"
              : "text-gray-500 border-white hover:text-primary"
          } 
          ${label === "Keluar" ? " hidden md:flex" : ""} 
          `}
      >
        {label}
      </div>
    );
  }

  return (
    <Layout title="Profil Detail">
      <SectionPath
        path={["Profil", "Detail"]}
        className=" bg-gray-100 hidden md:flex"
      />
      <section className=" flex justify-center ">
        <div className=" flex w-full flex-col md:flex-row md:w-[85rem]">
          <div className=" flex w-full flex-col md:w-3/12 md:border-r-2 border-gray-200 pt-20 md:py-12">
            <div className=" md:flex items-center hidden">
              <div className=" flex justify-center items-center w-20 h-20 rounded-full bg-gray-100">
                <Image
                  src={image}
                  loader={loader}
                  alt={name}
                  width={65}
                  height={65}
                  unoptimized
                  className=" rounded-full object-cover"
                />
              </div>
              <div className=" flex flex-col ml-4">
                <div className=" font-bold text-xl">
                  {email === name ? name?.split("@")[0] : name}
                </div>
                <div className=" text-sm">{email}</div>
              </div>
            </div>
            <div className=" flex justify-around md:justify-start border-b md:border-0 border-gray-200 md:flex-col md:space-y-6 md:mt-12">
              <MenuView
                onClick={() => router.push(`/profil/detail`)}
                link={`/profil/detail`}
                label="Tentang Saya"
              />
              <MenuView
                onClick={() => router.push(`/profil/langganan`)}
                link={`/profil/langganan`}
                label="Langganan"
              />
              <MenuView
                onClick={() => router.push(`/profil/notifikasi`)}
                link={`/profil/notifikasi`}
                label="Notifikasi"
              />
              <MenuView
                onClick={() => router.push(`/profil/bookmark`)}
                link={`/profil/bookmark`}
                label="Bookmark"
              />
              <MenuView
                onClick={() => handleLogout()}
                link={`/`}
                label="Keluar"
              />
            </div>
          </div>
          {children}
        </div>
      </section>
    </Layout>
  );
}
export default ContainerProfile;
