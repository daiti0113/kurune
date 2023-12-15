import { client, Item } from '@/libs/microcms'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
    const baseURL = process.env.BASE_URL || ''
    const { contents } = await client.getList<Item>({endpoint: 'items'})

    const dynamicPaths = contents.map(({id, updatedAt }) => {
        return {
            loc: `${ baseURL }/articles/${id}`,
            lastmod: updatedAt
        }
    })

    return getServerSideSitemap(dynamicPaths)
}
