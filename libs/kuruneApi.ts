import { Article, Comment } from "./microcms"

export type PostEmailNotifyPayload = {
    article: Article
    comment: Comment
}
