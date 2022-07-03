import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';

import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';


const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
 
    const [fetchPostById, isPostLoading] = useFetching( async(id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
      })  

    const [fetchComments, isCommentLoading] = useFetching( async(id) => {
        const response = await PostService.getComments(params.id)
        setComments(response.data)
    })  

    
      useEffect( () => {
        fetchPostById(params.id)
        fetchComments(params.id) 
      }, [])

    return (
        <div>
            <h1>Post Id Page</h1>
            
            {isPostLoading
                ? <MyLoader/>
                : <div>{post.id}. {post.title}</div>
            }

            <h1>Comments</h1>
            
            {isCommentLoading
                ? <MyLoader/>
                : <div>
                    {comments.map(comm => 
                        <div>
                            <h5>{comm.email}</h5>
                            <div>
                                {comm.body}
                            </div>
                        </div>
                        )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;