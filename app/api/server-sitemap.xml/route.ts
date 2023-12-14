import { client } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  console.log("GET!!! /api/server-sitemap.xml")
  const baseURL = process.env.BASE_URL || ''
  console.log({baseURL})

  const itemIds = await client.getAllContentIds({endpoint: 'items'})
  console.log({itemIds})

  const lastmod = new Date().toISOString()
  console.log({lastmod})

  const dynamicPaths = itemIds.map((id) => {
    return {
      loc: `${ baseURL }/articles/${id}`,
      lastmod
    }
  })

  console.log({dynamicPaths})

  return getServerSideSitemap(dynamicPaths)
}
