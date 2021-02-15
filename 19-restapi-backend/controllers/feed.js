const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
   res.status(200).json({
      posts: [
         { 
            _id: '1',
            title: 'First Post', 
            content: 'This is the firs post!',
            imageUrl: 'images/aku.jpg',
            creator: {
               name: 'Tegar Pratama',
            },
            createdAt: new Date()
         }
      ]
   });
};

exports.postPost = (req, res, next) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
      return res.status(422).json({ 
         message: 'Validation failed, entered data is incorrect',
         errors: errors.array()
      });
   }

   const title = req.body.title;
   const content = req.body.content;
  
   res.status(201).json({
      message: 'Post created succesfully!',
      post: {
         _id: new Date().getTime(), 
         title: title,
         content: content,
         creator: { name: 'Tegar Pratama' },
         createdAt: new Date()
      }
   });
};