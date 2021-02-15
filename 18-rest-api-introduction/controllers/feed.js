exports.getPosts = (req, res, next) => {
   res.status(200).json({
      posts: [{ title: 'First Post', content: 'This is the firs post!' }]
   });
};

exports.postPost = (req, res, next) => {
   const title = req.body.title;
   const content = req.body.content;
   
   // create post in db
   res.status(201).json({
      message: 'Post created succesfully!',
      post: {
         id: new Date().getTime(), 
         title: title,
         content: content
      }
   });
};