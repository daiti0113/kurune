import { client } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
    const baseURL = process.env.BASE_URL || ''
    const itemIds = await client.getAllContentIds({endpoint: 'items'})
    const lastmod = new Date().toISOString()

    const dynamicPaths = itemIds.map((id) => {
        return {
            loc: `${ baseURL }/articles/${id}`,
            lastmod
        }
    })

    return getServerSideSitemap(dynamicPaths)
}
