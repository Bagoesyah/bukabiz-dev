import Image from "next/image";
import Link from "next/link";

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
      name: 'FAQ',
      link: '/faq'
    },
    {
      id: 2,
      name: 'Tentang Bukabiz',
      link: '/tentang'
    },
    {
      id: 3,
      name: "Beriklan di Bukabiz",
      link: "/",
    },
    {
      id: 4,
      name: 'Subscribe Bukabiz Pro',
      link: '/subscribe'
    },
    {
      id: 5,
      name: "Produk Digital",
      link: "/",
    },
    {
      id: 6,
      name: 'Karir & Internship',
      link: '/karir'
    },
    {
      id: 7,
      name: 'Site Map',
      link: '/site-map'
    },
    {
      id: 8,
      name: 'Kontak Kami',
      link: '/kontak'
    },
  ];

  return (
    <footer>
      <div className=" bg-primary w-full flex justify-center">
        <div className=" md:w-[90rem] flex flex-col md:flex-row justify-center md:justify-between py-8 md:py-20 items-center">
          <div className=" flex flex-col space-y-4 items-center md:items-start">
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
          <div className=" space-y-2 mt-8 md:mt-0">
            {footerLink &&
              footerLink.slice(0, 4).map((items) => (
                <Link
                  href={items.link}
                  key={items.id}
                >
                  <p
                    className=" cursor-pointer hover:text-white font-medium text-center md:text-right"
                  >
                    {items.name}
                  </p>
                </Link>
              ))}
          </div>
          <div className=" space-y-2 mt-2 md:mt-0">
            {footerLink &&
              footerLink.slice(4, 8).map((items) => (
                <Link
                  href={items.link}
                  key={items.id}
                >
                  <p
                    className=" cursor-pointer hover:text-white font-medium text-center md:text-right"
                  >
                    {items.name}
                  </p>
                </Link>
              ))}
          </div>
          <div className=" flex flex-col md:space-y-1 mt-8 md:mt-0">
            <div className=" text-xl md:text-3xl font-bold text-white text-center md:text-left">
              BukaBiz News Letter
            </div>
            <p className=" text-sm text-center md:text-left">
              Dapatkan info artikel dan daftar peluang bisnis <br />
              terbaru dari BukaBiz
            </p>
            <div className="flex space-x-2 mt-8 md:mt-0">
              <input
                type="text"
                className=" h-10 px-3 w-64 text-sm bg-white text-black  border-opacity-70 focus:outline-none placeholder:text-black"
              />
              <button className=" text-white h-10 px-4 md:px-8 tracking-widest bg-black text-sm font-bold uppercase text-center border-white border-2 hover:bg-transparent hover:text-black duration-300">
                Submit
              </button>
            </div>
            <p className=" text-sm text-center md:text-left mt-4 md:mt-0">
              Get this deliveredto your inbox, and more info <br />
              about our products and services.
            </p>
          </div>
          <div>
            <p className=" text-white font-bold text-center md:text-left mt-8 md:mt-0">
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
      <div className=" bg-black opacity-80 w-full flex justify-center">
        <div className=" w-60 md:w-[90rem] py-6 text-xs text-white text-center md:text-left">
          <p>
            © 2021 Bukabiz.com All rights reserved | PT. Menata Bisnis Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
