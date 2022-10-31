import Image from "next/image";

import ICLogoFooter from "@assets/LogoFooter.svg";
import Fb from "@assets/Fb.png";
import Ig from "@assets/Ig.png";
import Tw from "@assets/Tw.png";
import Yt from "@assets/Yt.png";
import Tt from "@assets/Tt.png";
import Playstore from "@assets/Playstore.png";
import Appstore from "@assets/Appstore.png";

function Footer() {
  const socmed = [
    {
      id: 1,
      name: "Facebook",
      image: Fb,
    },
    {
      id: 2,
      name: "Instagram",
      image: Ig,
    },
    {
      id: 3,
      name: "Twitter",
      image: Tw,
    },
    {
      id: 4,
      name: "Youtube",
      image: Yt,
    },
    {
      id: 5,
      name: "Tiktok",
      image: Tt,
    },
  ];

  const footerLink = [
    {
      id: 1,
      name: "FAQ",
      link: "/",
    },
    {
      id: 2,
      name: "Tentang Bukabiz",
      link: "/",
    },
    {
      id: 3,
      name: "Beriklan di Bukabiz",
      link: "/",
    },
    {
      id: 4,
      name: "Subscribe Bukabiz Pro",
      link: "/",
    },
    {
      id: 5,
      name: "Produk Digital",
      link: "/",
    },
    {
      id: 6,
      name: "Karir & Internship",
      link: "/",
    },
    {
      id: 7,
      name: "Site Map",
      link: "/",
    },
    {
      id: 8,
      name: "Kontak Kami",
      link: "/",
    },
  ];

  return (
    // <footer className="">
    //   <div className="h-full w-full bg-primary p-5 md:flex md:justify-center ">
    //     <div className="py-10 md:w-[90rem] md:flex md:justify-between md:items-center ">
    //       <div className="flex flex-col justify-center items-center my-3 md:items-start md:mt-0">
    //         <ICLogoFooter />
    //         <div className="flex space-x-6 md:space-x-2">
    //           {socmed &&
    //             socmed.map((items) => (
    //               <a key={items.id} href="#" className=" cursor-pointer">
    //                 <Image
    //                   src={items.image}
    //                   alt={items.name}
    //                   width={35}
    //                   height={35}
    //                 />
    //               </a>
    //             ))}
    //         </div>
    //       </div>
    //       <div className="flex flex-col justify-center items-center md:flex md:flex-row md:gap-4">
    //         <div className="flex flex-col justify-center items-center md:items-end">
    //           {footerLink &&
    //             footerLink.slice(0, 4).map((items) => (
    //               <p
    //                 key={items.id}
    //                 className=" cursor-pointer hover:text-white font-medium text-right"
    //               >
    //                 {items.name}
    //               </p>
    //             ))}
    //         </div>
    //         <div className="flex flex-col justify-center items-center md:items-end">
    //           {footerLink &&
    //             footerLink.slice(4, 8).map((items) => (
    //               <p
    //                 key={items.id}
    //                 className=" cursor-pointer hover:text-white font-medium text-right"
    //               >
    //                 {items.name}
    //               </p>
    //             ))}
    //         </div>
    //       </div>
    //       <div className="flex flex-col space-y-2 my-4 text-center md:text-left">
    //         <div className="font-bold text-white text-2xl md:text-3xl">
    //           BukaBiz News Letter
    //         </div>
    //         <p className=" text-sm">
    //           Dapatkan info artikel dan daftar peluang bisnis <br />
    //           terbaru dari BukaBiz
    //         </p>
    //         <div className="flex space-x-2">
    //           <input
    //             type="text"
    //             className=" h-10 lg:px-3 w-64 text-sm bg-white text-black  border-opacity-70 focus:outline-none placeholder:text-black"
    //           />
    //           <button className=" text-white h-10 w-full tracking-widest bg-black text-sm font-bold uppercase text-center border-white border-2 hover:bg-transparent hover:text-black duration-300">
    //             Submit
    //           </button>
    //         </div>
    //         <p className=" text-sm">
    //           Get this deliveredto your inbox, and more info <br />
    //           about our products and services.
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-white font-bold text-center md:text-left">
    //           coming soon app will be available on
    //         </p>
    //         <div className=" flex space-x-2 mt-2 justify-center">
    //           <div>
    //             <Image
    //               src={Playstore}
    //               alt="playstore"
    //               width={175}
    //               height={55}
    //             />
    //           </div>
    //           <div>
    //             <Image src={Appstore} alt="appstore" width={175} height={55} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex w-full justify-center p-6 pl-12 text-center bg-black opacity-80">
    //     <div className="w-60 text-white text-xs md:w-[90rem] md:text-base">
    //       <p>
    //         © 2021 Bukabiz.com All rights reserved | PT. Menata Bisnis Indonesia
    //       </p>
    //     </div>
    //   </div>
    // </footer>

    <footer className="">
      <div className=" h-full w-full bg-primary p-5 md:flex md:justify-center md:p-0">
        <div className=" py-10 md:w-[90rem] md:flex md:justify-between md:items-center md:py-20">
          <div className=" flex flex-col justify-center items-center my-3 md:items-start md:space-y-4 md:my-0 md:mt-0">
            <ICLogoFooter />
            <div className=" flex space-x-5">
              {socmed &&
                socmed.map((items) => (
                  <a key={items.id} href="#" className=" cursor-pointer">
                    <Image
                      src={items.image}
                      alt={items.name}
                      width={35}
                      height={35}
                    />
                  </a>
                ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center md:flex md:flex-row md:space-x-4">
            <div className=" flex flex-col justify-center items-center space-y-2 mb-2 md:items-end md:mb-0">
              {footerLink &&
                footerLink.slice(0, 4).map((items) => (
                  <p
                    key={items.id}
                    className=" cursor-pointer hover:text-white font-medium text-right"
                  >
                    {items.name}
                  </p>
                ))}
            </div>
            <div className=" flex flex-col justify-center items-center space-y-2 md:items-end">
              {footerLink &&
                footerLink.slice(4, 8).map((items) => (
                  <p
                    key={items.id}
                    className=" cursor-pointer hover:text-white font-medium text-right"
                  >
                    {items.name}
                  </p>
                ))}
            </div>
          </div>
          <div className=" flex flex-col space-y-2 my-4 text-center md:text-left md:space-y-1">
            <div className=" text-2xl md:text-3xl font-bold text-white">
              BukaBiz News Letter
            </div>
            <p className=" text-sm">
              Dapatkan info artikel dan daftar peluang bisnis <br />
              terbaru dari BukaBiz
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                className=" h-10 px-3 w-64 text-sm bg-white text-black  border-opacity-70 focus:outline-none placeholder:text-black"
              />
              <button className=" text-white h-10 w-full md:px-2 tracking-widest bg-black text-sm font-bold uppercase text-center border-white border-2 hover:bg-transparent hover:text-black duration-300">
                Submit
              </button>
            </div>
            <p className=" text-sm">
              Get this deliveredto your inbox, and more info <br />
              about our products and services.
            </p>
          </div>
          <div>
            <p className=" text-white font-bold text-center md:text-left">
              coming soon app will be available on
            </p>
            <div className=" flex space-x-2 mt-2">
              <div>
                <Image
                  src={Playstore}
                  alt="playstore"
                  width={175}
                  height={55}
                />
              </div>
              <div>
                <Image src={Appstore} alt="appstore" width={175} height={55} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full justify-center p-6 pl-12 text-center bg-black opacity-80 md:text-left">
        <div className=" w-60 text-white text-xs md:w-[90rem] md:text-base">
          <p>
            © 2021 Bukabiz.com All rights reserved | PT. Menata Bisnis Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
