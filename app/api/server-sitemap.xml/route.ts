import { getList } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const baseURL = process.env.BASE_URL || ''
  const { contents } = await getList()
  const lastmod = new Date().toISOString()


  const dynamicPaths = contents.map(({ id }) => {
    return {
      loc: `${ baseURL }/articles/${id}`,
      lastmod
    }
  })

  return getServerSideSitemap(dynamicPaths)
}
