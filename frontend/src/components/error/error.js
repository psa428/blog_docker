import { PROP_TYPE } from "../../constants/prop-type";
import styled from "styled-components";

const Div = styled.div`
    display:    flex;
    flex-direction: column;
    align-items:    center;
`;


export const Error = ({ error }) => 
    error && (
         <Div>
            <h2>Ошибка</h2>
            <div>{error}</div>
        </Div>
     );  
     
Error.propTypes = {
    error:  PROP_TYPE.ERROR,
    
};