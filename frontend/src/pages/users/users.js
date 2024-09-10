import {  TableRow } from "./components";
import { PrivateContent } from "../../components";

import { UserRow } from "./components";
// import { server } from "../../bff/server";

import { useEffect, useState } from "react";

import { ROLE } from "../../bff/constants";
import { checkAccess, request } from "../../utils";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
    const userRole = useSelector(selectUserRole);


    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        };

        Promise.all([
            request('/users'), 
            request('/users/roles'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
               
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            };
            setUsers(usersRes.data);
            
            setRoles(rolesRes.data);
            
        });
        
    }, [ shouldUpdateUserList, userRole]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        };
        request(`/users/${userId}`, 'DELETE').then(() => {    
            setShouldUpdateUserList(!shouldUpdateUserList);

        })
    };

    return (
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            <div className={className}>           
                <h2>Пользователи</h2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registred-at-column">Дата регистрации</div>
                        <div className="role-column">Роль</div>
                    </TableRow>
                   
                    {users.map(({ id, login, registeredAt, roleId }) => (
                        <UserRow 
                            key={id} 
                            id={id}
                            login={login} 
                            registeredAt={registeredAt} 
                            roleId={roleId}  
                            roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
                            onUserRemove={() => onUserRemove(id)}
                        />    
                    ))}  

                </div>    
            </div>  
        </PrivateContent> 
    );

}

export const Users = styled(UsersContainer)`
    display:    flex;
    flex-direction: column;  
    align-items:   center;
    margin: 0   auto;
    width:  570px;
    front-size: 18px;

   

`;