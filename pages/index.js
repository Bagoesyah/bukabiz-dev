import { useGet, usePost } from "@library/useAPI";

import { Layout, SectionCategory } from "@components/index";
import {
  SectionSearch,
  SectionPas,
  SectionHits,
  SectionPeluang,
  SectionPanduan,
} from "@components/Beranda/index";

function Home() {
  const hits = useGet("v1/article/hits-article");
  const peluang = usePost("v1/article/peluang-bisnis");
  const panduan = usePost("v1/article/panduan-bisnis");

  return (
    <Layout title="Beranda">
      <SectionSearch />
      <SectionCategory className="mt-8" />
      <SectionPas />
      <SectionHits title="Yang Lagi Hits!" data={hits} link="yang-lagi-hits" />
      <hr />
      <SectionPeluang
        title="Peluang. Jangan Sampai Lolos! "
        data={peluang}
        link="peluang-bisnis"
      />
      <hr />
      <SectionPanduan
        title="Belajar Panduan Bisnis Dulu!"
        data={panduan}
        link="panduan-bisnis"
      />
    </Layout>
  );
}

export default Home;
