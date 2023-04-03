import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById();
        fetchComments();
    },[])
    return (
        <div>
            <h1 style={{color:'#fff', margin:'15px 0px'}} >Post number: {params.id}</h1>
            {isLoading
                ? <Loader/>
                :<div style={{color:'mediumslateblue', margin:'15px 0px'}}> {post.title}</div>
            }
            <h1 style={{color:'#fff'}}>
                Comments
            </h1>
            {isLoading
                ? <Loader/>
                :<div style={{width:'40%'}}>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop:15}}>
                            <h5>{comm.email}</h5>
                            <p>{comm.body}</p>
                        </div>


                    )}
                </div>

            }
        </div>
    );
};

export default PostIdPage;