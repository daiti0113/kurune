import { Article, Comment } from "./microcms"

export type NotifyEmailPostPayload = {
    article: Article
    comment: Comment
}
