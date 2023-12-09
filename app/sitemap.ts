import { MetadataRoute } from 'next'
import { getList } from '@/libs/microcms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.BASE_URL || ''
  const { contents } = await getList()
  const lastModified = new Date()

  const staticPaths = [{
    url: baseURL,
    lastModified
  }]

  const dynamicPaths = contents.map(({ id }) => {
    return {
      url: `${ baseURL }/articles/${id}`,
      lastModified
    }
  })

  return [ ...staticPaths, ...dynamicPaths ]
}
