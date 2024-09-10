import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostContent } from "./components/post-content/post-content";
import { Comments } from "./components";
import { Error} from "../../components/error/error";
import { PrivateContent } from "../../components";

import { RESET_POST_DATA } from "../../actions";
import { loadPostAsync } from "../../actions/load-post-async";
import { selectPost, selectUserRole } from "../../selectors";
import styled from "styled-components";
import { PostForm } from "./components/post-form/post-form";
import { ROLE } from "../../bff/constants";


const PostContainer = ({ className }) => {

    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const isEditing = useMatch('/posts/:id/edit');
    const isCreating = useMatch('/posts');
    const post =  useSelector(selectPost);
    


    useLayoutEffect(() => {
        dispatch(RESET_POST_DATA);
    }, [dispatch, isCreating]);
 
    useEffect(() => {

        if (isCreating) {
            setIsLoading(false);
            return;
        };
            
        dispatch(loadPostAsync(params.id));
        
        // .then((postData) => {              
        //         setError(postData.error);
        //         setIsLoading(false);
        //       })
    }, [dispatch, params.id, isCreating]);
    
    // if (isLoading) {
    //     return null;
    // }

    
    
    const SpecificPostPage = isCreating || isEditing ? (
        <PrivateContent access={[ROLE.ADMIN]} >
            <div className={className}>
                
                <PostForm post={post} />
            </div>
        </PrivateContent>    
    ) : (
        <div className={className}>    
                
            <PostContent post={post} /> 
            
            <Comments comments={post.comments} postId={params.id}/>
        </div>
    );

    return error ? <Error error={error} /> : SpecificPostPage;
        
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;
