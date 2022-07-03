import React, {useState} from 'react';

import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', description: ''})

    const addNewPost = function (e) {
      e.preventDefault()
      const newPost = {
          ...post, id: Date.now()
      }
      create(newPost)
      setPost({title: '', description: ''})
      
    }
    return (
        <div>
            <form action="">
            <MyInput  
            value = {post.title}
            onChange = {e => setPost({...post, title: e.target.value})}
            type = 'text'
            placeholder='Name of post'
            />
            <MyInput 
            value = {post.description}
            onChange = {e => setPost({...post, description: e.target.value})}
            type="text" 
            placeholder='Description of post'
            />
            <MyButton onClick={addNewPost}>Create Post</MyButton>
            </form>  
        </div>
    );
};

export default PostForm;