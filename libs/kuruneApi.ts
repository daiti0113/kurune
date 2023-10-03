import { Article, Comment } from "./microcms"

export type PostEmailNotifyPayload = {
    article: Article
    comment: Omit<Comment, "item"> & { item: string }
}
