import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,id: Date.now()
        }
        create(newPost);
        setPost({...post, body: '', title: ''})
    }
    return (
        <form>
            {/* Controlled component */}
            <MyInput
                value={post.title}
                type="text"
                placeholder="Title of the post"
                onChange={(e) =>
                    setPost({...post, title: e.target.value})
                }
            />
            <MyInput
                value={post.body}
                type="text"
                placeholder="Description of the post"
                onChange={e =>
                    setPost({...post, body: e.target.value})
                }
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default PostForm;