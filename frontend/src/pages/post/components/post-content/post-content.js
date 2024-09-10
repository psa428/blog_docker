import { useNavigate } from "react-router-dom";
import { Icon } from "../../../../components";
import { SpecialPanel } from '../special-panel/special-panel';
import styled from "styled-components";
import { PROP_TYPE } from '../../../../constants';


const PostContentContainer = ({ 
    className, 
    post //:   { _id, title, imageUrl, content, publishedAt, },
    
}) => {
    const navigate = useNavigate();
    
    return (
        <div className={className}>
           
            <img src={post.image} alt={post.title}  />
            <h2>{post.title}</h2>
            
            <SpecialPanel 
                id={post._id}
                publishedAt={post.createdAt} 
                margin="-20px 0 20px" 
                editButton={
                    <Icon
                        id="fa-pencil-square-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={() => navigate(`/posts/${post._id}/edit`)}
                    />
                } 
            />
            
            <div className="post-text">{post.content}</div>

        </div>

    );

};

export const PostContent = styled(PostContentContainer)`
    & img {
        float:  left;
        margin: 0 20px 10px 0;
    } 

    & .post-text {
        font-size:  18px;
        white-space:    pre-line;
    }

`;

PostContent.propTypes = {
    post:   PROP_TYPE.POST.isRequired,

};