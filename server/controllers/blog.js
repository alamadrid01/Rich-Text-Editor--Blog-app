const mongoose = require("mongoose")
const blogSchema = require("../model/blogSchema")


const blogHome = (req,res) => {
    res.json({"message": "this is the blog api"})
}

const createPost = async(req, res)=> {
    const {title, body, author} = req.body;

    if(!title || !body || !author) res.status(400)

    try{
        const saveBlog = await blogSchema.create({
            title: title,
            body: body,
            author: author
        })
        res.status(201).json(saveBlog)
    }catch(err){
        res.status(500)
    }


}

const deletePost = async(req, res) =>{
    const postId = req.params.id

    if(!postId) res.status(400).json({"message": "No params was passed in"})

    try{
        const deleteBlog = await blogSchema.findOneAndDelete({_id: postId})
        if(!deleteBlog){
            res.status(404).json({message: 'Blog post not found'});
        }
        res.status(204).json(deleteBlog)
    }catch(err){
        res.status(500).json({"error_message": err.message})
    }
   
}

const updatePost = async(req, res) =>{
    const {title, body, author} = req.body;
    const postId = req.params.id

    if(!title || !body || postId || !author ) res.status(400)

    try{
        const updatedBlog = await blogSchema.findOneAndUpdate(postId, {title, body, author}, {new: true})
        if (updatedBlog) {
            res.status(200).json(updatedBlog);
          } else {
            res.status(404).json({message: 'Post not found'});
          }
    }catch(err){
        res.status(500).json(err.message)
    }

}

const getSinglePost = async(req, res) =>{
    const postId = req.params.id

    if(!postId) res.status(400).json({ error: 'Invalid request' });

    try{
        const post = await blogSchema.findById(postId)
        if(!post){
            res.status(404).json({"message": "No post found with that ID"})
        }
        res.json(post)
    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createPost, deletePost, updatePost, getSinglePost, blogHome
}
