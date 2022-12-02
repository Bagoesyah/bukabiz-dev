import { useGet } from "@library/useAPI";
import { Layout, SectionCategory } from "@components/index";
import Hits from "@components/DetailList/Hits";
import MungkinSuka from "@components/DetailList/MungkinSuka";

function YangLagiHits() {
  return (
    <Layout title="Yang Lagi Hits">
      <SectionCategory className="border-b" />
      <Hits />
      <MungkinSuka />
    </Layout>
  );
}

export default YangLagiHits;
