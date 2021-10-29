const { ApolloServer, gql } = require('apollo-server');
const BlogDB = require('./mongoose_schema');
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');


const uri = "mongodb+srv://admin:admin@cluster0.6rvcr.mongodb.net/Cluster0?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const blogResolvers = {
    Query: {
        blogs: (parent, args, context, info) => {
            client.connect()
            const collection = client.db("Cluster0").collection("blogs");
            results = collection.find({}).toArray()
            // client.close();
            return results
            // perform actions on the collection object
        }
    },

    Mutation: {

        newPost(parent, args, context, info) {

            const { title, body, authorName, authorEmail } = args

            uid = uuidv4()

            const blogObj = {
                id: uid,
                title,
                body,
                author: {
                    authorName,
                    authorEmail
                },
                likes: 0,
                unlikes: 0,
                comments: []
            }

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            collection.insertOne(blogObj)

            return blogObj


        },

        updateBlog(parent, args, context, info) {

            const { id, title, body } = args

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            filter = { id: id }

            if (title !== undefined) {

                const updateDoc = {
                    $set: {
                        title: title
                    },
                };


                results = collection.updateOne(filter, updateDoc)


            }

            if (body !== undefined) {

                const updateDoc = {
                    $set: {
                        body: body
                    },
                };


                results = collection.updateOne(filter, updateDoc)

            }

            return collection.findOne({ id: id })

        },

        deleteBlog(parents, args, context, info) {
            const { id } = args

            const doc = {
                id: id
            }

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Blog deleted successfully"
            } catch (e) {
                return `Something went wrong, error ${e}`
            }

        },

        likeBlog(parent, args, context, info) {
            const { id } = args

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            filter = { id: id }

            // temp = collection.findOne(filter)


            const updateDoc = {
                $inc: {
                    likes: 1
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)



        },

        unlikeBlog(parent, args, context, info) {

            const { id } = args

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            filter = { id: id }

            // temp = collection.findOne(filter)


            const updateDoc = {
                $inc: {
                    unlikes: 1
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)


        },

        addComment(parent, args, context, info) {

            const { id, comment, authorName, authorEmail } = args

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            filter = { id: id }

            uid = uuidv4();

            commentObj = {
                commentID: uid,
                comment: comment,
                author: {
                    authorName,
                    authorEmail
                }
            }


            const updateDoc = {
                $push: {
                    comments: {
                        $each: [commentObj]
                    }
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)


        },

        deleteComment(parent, args, context, info) {
            const { commentID } = args

            const doc = {
                commentID: commentID
            }

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Comment deleted successfully"
            } catch (e) {
                return `Something went wrong, error ${e}`
            }
        }



    }


}


module.exports = blogResolvers;