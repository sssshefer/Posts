import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Loader from "./UI/loader/Loader";

const PostList = ({isPostsLoading,limit,posts, title, remove}) => {
        const [errMes, setErrMes] = useState(null);
        const timeOutId = useRef();
        const postList = useRef(null);

        const postsHeight = useMemo(() => {
            return (limit * 135 + 38).toString() + 'px';
        }, [limit])


        useEffect(() => {
            if (postList.current) {
                postList.current.style.minHeight = postsHeight;
            }
        }, [limit]);
        useEffect(() => {
            setErrMes(null);
            if (!posts.length) {
                timeOutId.current = setTimeout(() => {
                    setErrMes(<h1 style={{textAlign: 'center', color: 'white'}}>No posts were found</h1>)
                }, 1000)
            } else {
                clearTimeout(timeOutId.current);
            }
            return () => {
                setErrMes(null)
                clearTimeout(timeOutId.current);
            }
        }, [posts])


        return (
            <div ref={postList}>
                <h1 style={{textAlign: "right"}}>{title}</h1>
                {errMes}
                {isPostsLoading && !posts.length &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>}
                <TransitionGroup>
                    {posts.map((post, index) =>
                        <CSSTransition
                            key={post.id}
                            timeout={200}
                            classNames="post"

                        >

                            <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }
;

export default PostList;