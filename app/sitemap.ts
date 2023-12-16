import { MetadataRoute } from 'next'
import { Category, client, Item } from '@/libs/microcms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = process.env.BASE_URL || ''
    const { contents: items } = await client.getList<Item>({endpoint: 'items'})
    const { contents: categories } = await client.getList<Category>({endpoint: 'categories'})
    const lastModified = new Date()

    const staticPaths = [
        {
            url: baseURL + "/",
            lastModified,
            priority: 1,
        },
        {
            url: baseURL + "/categories",
            lastModified,
        },
        {
            url: baseURL + "/privacy",
            lastModified,
        },
        {
            url: baseURL + "/tos",
            lastModified,
        },
    ]

    const itemPaths = items.map(({ id, updatedAt }) => {
        return {
            url: `${ baseURL }/articles/${id}`,
            lastModified: updatedAt,
        }
    })

    const categoryPaths = categories.map(({ id }) => {
        return {
            url: `${ baseURL }/categories/${id}`,
            lastModified: lastModified,
        }
    })

    return [ ...staticPaths, ...itemPaths, ...categoryPaths ]
}
