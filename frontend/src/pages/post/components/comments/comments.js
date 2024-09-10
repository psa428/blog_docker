import PropTypes from 'prop-types'; 
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components";
import { Comment } from './components';
import styled from "styled-components";
import { selectUserRole } from "../../../../selectors";
import { addCommentAsync } from "../../../../actions";
import { ROLE } from "../../../../bff/constants";
import { PROP_TYPE } from '../../../../constants';


const CommentsContainer = ({ className, comments, postId }) => {
   
    const [newComment, setNewComment] = useState('');
    const dispatch =  useDispatch();
    const userRole = useSelector(selectUserRole);
    

    const onNewCommentAdd = ( postId, content) => {
        dispatch(addCommentAsync( postId, content));
        setNewComment('');
    
};
const   isGuest = userRole === ROLE.GUEST;
    return (
        <div className={className}>
        {!isGuest && (
            <div className="new-comment">
                <textarea name="comment" value={newComment} placeholder="Комментарий..." 
                    onChange={({ target }) => setNewComment(target.value)}
                ></textarea>
                
                <Icon
                    id="fa-paper-plane-o"
                    margin="0 7px 0 0"
                    size="18px"
                    onClick={() => onNewCommentAdd( postId, newComment)}
                />   
            </div> 
        )}
            <div className="comments">
                {comments.map(({ _id, author, content, createdAt }) => 
                    <Comment 
                        key={_id}
                        postId={postId}
                        id={_id}
                        author={author}
                        content={content}
                        publishedAt={createdAt}
                    />
                    
                )}
            </div>
               
        </div>
    )    
};


export const Comments = styled(CommentsContainer)`
    
    width:  580px;
    margin: 0 auto;

    & .new-comment  {
        display:    flex;
        width:  100%;
        margin: 20px 0 10px;
    }

    & .new-comment textarea {
        width:  550%;
        height: 120px;
        font-size:  18px;
        resize: none;
    }
`;

Comments.propTypes = {
    comments:   PropTypes.arrayOf(PROP_TYPE.COMMENT),
    postId: PropTypes.string.isRequired,

};