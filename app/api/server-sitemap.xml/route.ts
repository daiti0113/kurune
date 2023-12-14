import { getList } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  console.log("GET!!! /api/server-sitemap.xml")
  const baseURL = process.env.BASE_URL || ''
  console.log({baseURL})
  const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN
  const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY
  
  let test: Array<any> = []
  try {
    console.log({MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY})
    const { contents } = await getList()
    test = contents
    console.log({contents})
  } catch (error) {
    console.error({error})
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
