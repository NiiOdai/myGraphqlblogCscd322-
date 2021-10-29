const { gql } = require('apollo-server');


const typeDefs = gql`
scalar Date

"A blog written by a user"

    type Blog {
        id: ID!
        title: String!
        body: String!
        author: Author!
        comments: [Comment]
        likes: Int
        unlikes: Int
    }

    type Author {
        authorName: String!
        authorEmail: String
    }

    type Comment {
        commentID: ID!
        comment: String
        author: Author
    }

type Query {
    blogs: [Blog!]!,
}


type Mutation {    
    newPost(
        title: String!,
        body: String!,
        authorName: String!,
        authorEmail: String!
        ) : Blog,

    "Update blogs"
    updateBlog(id: ID!, title: String, body: String) : Blog,

    "Delete blog"

    deleteBlog(id: ID!) : String,

    "Like a Blog"
    likeBlog(id: ID!) : Blog,

    "Unlike a blog"
    unlikeBlog(id: ID!) : Blog,

    "add comments to blogs"
    addComment(id:ID!, comment: String!, authorName : String!, authorEmail: String!) : Blog,

    "delete comment"
    deleteComment(commentID: ID!) : String,

}


`;



module.exports = typeDefs;