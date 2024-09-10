import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon} from '../../../../components';
import styled from "styled-components";
import { selectUserLogin, selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../bff/operations/constants/role';

import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
    display:    flex;
    justify-content:    flex-end;
    align-itrms:    center;

`;

const UserName = styled.div`
    font-size:  18ps;
    font-weight:    bold;

`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);

    const onLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem('userData');
    };

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    return (
        <div className={className}>
            <RightAligned>
                
                    
                    {roleId === ROLE.GUEST ? (
                        <Button>
                            <Link to="/login">Войти</Link>
                        </Button>
                    ) : (
                        <>
                            <UserName>{login}</UserName>                   
                                <Icon 
                                    id="fa-sign-out" 
                                    margin="0 0 0 10px" 
                                    onClick = {onLogout}
                                    
                                 />
                        </>
                    )}
        
            </RightAligned>
            <RightAligned>
                
                <Icon id="fa-backward" margin="10px 0 0 0" onClick = {() => navigate(-1)}/>
                
                
                {isAdmin && (
                    <>
                        <Link to="/posts">
                            <Icon id="fa-file-text-o" margin="10px 0 0 16px"  />
                        </Link>
                        <Link to="/users">
                            <Icon id="fa-users" margin="10px 0 0 16px"  />
                        </Link>
                    </>    
                )}

            </RightAligned>

        </div>    
    );    

};

export const ControlPanel = styled(ControlPanelContainer)`

`;
