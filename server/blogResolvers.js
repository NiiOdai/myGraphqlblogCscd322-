const { ApolloServer, gql } = require('apollo-server');
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const uri = "mongodb+srv://admin:admin@cluster0.6rvcr.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true 
                                });
const blogResolvers = {
    Query: {
        blogs: (parent, args, context, info) => {
            client.connect()
            const collection = client.db("Cluster0").collection("blogs");
            results = collection.find({}).toArray()
            return results          
        }
    },
      // mutate new Blog-post,likes,unlikes,comment 
    Mutation: {
        newPost(parent, args, context, info) {
            const { title, content, authorName, authorEmail } = args
            uid = uuidv4()
            const myBlog = {
                id: uid,
                title,
                content,
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
            collection.insertOne(myBlog)
            return myBlog


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

        delete(parents, args, context, info) {
            const { id } = args

            const doc = {
                id: id
            }

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");
            try {
                deleted = collection.deleteOne(doc)
                return "Post delete Successful"
            } catch (e) {
                return `Error?~?~?~ , error ${e}`
            }

        },

        likeBlog(parent, args, context, info) {
            const { id } = args

            client.connect()
            const collection = client.db("Cluster0").collection("blogs");

            filter = { id: id }


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
                deleted = collection.deleteOne(doc)
                return "Comment deleted successfully"
            } catch (e) {
                return `Errr Error?~, error ${e}`
            }
        }



    }


}


module.exports = blogResolvers;