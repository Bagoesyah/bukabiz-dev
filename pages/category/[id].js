import Layout from "@components/Layout"
import SectionCategory from "@components/SectionCategory"
import CategoryList from "@components/DetailList/CategoryList"
import MungkinSuka from "../../components/DetailList/MungkinSuka"
import { useRouter } from "next/router"
import Error from "next/error"

function Category() {
  const { asPath } = useRouter()
  let splitLink = asPath.split('?')
  if (splitLink[1] === undefined) return <Error statusCode={404} />
  return (
    <Layout title="Category">
      <SectionCategory />
      <CategoryList />
      <MungkinSuka />
    </Layout>
  )
}


export default Category