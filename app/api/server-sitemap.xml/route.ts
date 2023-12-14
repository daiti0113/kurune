import { getList } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  console.log("GET!!! /api/server-sitemap.xml")
  const baseURL = process.env.BASE_URL || ''
  console.log({baseURL})
  let test: Array<any> = []
  try {
    const { contents } = await getList()
    test = contents
    console.log({contents})
  } catch (error) {
    console.log({error})
  }
  
  const lastmod = new Date().toISOString()
  console.log({lastmod})

  const dynamicPaths = test.map(({ id }) => {
    return {
      loc: `${ baseURL }/articles/${id}`,
      lastmod
    }
  })

  console.log({dynamicPaths})

  return getServerSideSitemap(dynamicPaths)
}
