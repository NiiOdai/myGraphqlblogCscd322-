const { gql } = require('apollo-server');


const typeDefs = gql`


"A blog written by a user"

    type Blog {
        id: ID!
        title: String!
        content: String!
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
        content: String!,
        authorName: String!,
        authorEmail: String!
        ) : Blog,

    "Update"
    updateBlog(id: ID!, title: String, body: String) : Blog,
    "Delete"
    delete(id: ID!) : String, 

    likeBlog(id: ID!) : Blog,  

    unlikeBlog(id: ID!) : Blog,
    addComment(id:ID!,
    comment: String!,
    authorName : String!,
    authorEmail: String!) : Blog,

    "delete comment"
    deleteComment(commentID: ID!) : String,

}


`;



module.exports = typeDefs;