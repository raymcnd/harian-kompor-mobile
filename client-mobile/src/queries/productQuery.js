import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query Query {
        getPosts {
            id
            title
            content
            imgUrl
            categoryId
            authorMongoId
            createdAt
            Category {
                name
            }
            Tags {
                name
            }
        }
    }
`

export const GET_POST = gql`
    query GetPostById($getPostByIdId: ID!) {
        getPostById(id: $getPostByIdId) {
            id
            title
            content
            imgUrl
            categoryId
            authorMongoId
            authorMongo {
                username
            }
            createdAt
            Category {
                name
            }
            Tags {
                name
            }
        }
    }
`