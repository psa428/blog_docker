import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input} from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanitizeContent } from "./utils";
import { savePostAsync } from "../../../../actions";
import styled from "styled-components";

import { PROP_TYPE } from '../../../../constants/prop-type';


const PostFormContainer = ({ 
    className, 
    post:   { _id, title, image, content, createdAt },
    
}) => {
    const [imageUrlValue, setImageUrlValue] = useState(image);
    const [titleValue, setTitleValue] = useState(title);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        setImageUrlValue(image);
        setTitleValue(title);

    }, [image, title]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const onSave = () => {
        
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(_id, { 
                imageUrl: imageUrlValue, 
                title: titleValue, 
                content: newContent
            }),
        ).then(({id}) => {
           
            navigate(`/posts/${id}`) 

        }        
           

        );
    }; 

    const onImageChange = ({ target }) => setImageUrlValue(target.value);
    const onTitleChange = ({ target }) => setTitleValue(target.value);
    
    return (
        <div className={className}>
            <Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange} />
            <Input value={titleValue} placeholder="Заголовок..."  onChange={onTitleChange} />
            <SpecialPanel 
                id={_id}
                publishedAt={createdAt} 
                margin="20px 0" 
                editButton={
                    <Icon
                        id="fa-floppy-o"
                        size="21px"
                        
                        onClick={onSave}
                    />    
                } 
            />
            <div 
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text">
                {content}
            </div>

        </div>

    );

};

export const PostForm = styled(PostFormContainer)`
    & img {
        float:  left;
        margin: 0 20px 10px 0;
    } 

    
    & .post-text {
    min-height: 80px;
        border: 1px solid #000;
        font-size:  18px;
        white-space:    pre-line;
    }

`;
PostForm.propTypes = {
    post:   PROP_TYPE.POST.isRequired,
};