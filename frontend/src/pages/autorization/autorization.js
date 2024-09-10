import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { AuthFormError, Input, Button } from '../../components';
import { useResetForm } from '../../hooks';

import styled from 'styled-components';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../bff/operations/constants/role';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
    login:  yup.string()
        .required('Введите логин')
        .matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
        .min(3, 'Неверный логин. Длина должна быть не менее 3 цифр')
        .max(15, 'Неверный логин. Длина не более 15 символов'),
    password:   yup.string()
        .required ('Введите пароль') 
        .matches(/^[\w#%]+$/, 'Неверный пароль. Допускаяются буквы, цифры и символы # %')
        .min(6, 'Длина пароля не менее 8 символов')  
        .max(15, 'Длина пароле не более 15 символов')


});

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration:    underline;
    margin: 20px 0;
    font-size:  18px;
`;

const AutorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState:  { errors }

    } = useForm({
        defaultValues:  {
            login:  '',
            password:   '',
        },
        resolver:   yupResolver(authFormSchema),

    });

    const [serverError, setServerError] = useState(null);

    
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password}) => {
        
        request('/login', 'POST', { login, password }).then(({error, user}) => {
            
            if (error) {  
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }

            dispatch(setUser(user));
            sessionStorage.setItem('userData', JSON.stringify(user));
        })

    };

    const formError = errors.login?.message || errors?.password?.message ;

    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>

    }

    return (
        <div className={className}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    type="text" 
                    placeholder="Логин..." 
                    {...register('login', {
                        onChange: () => setServerError(null),
                    })} />
                <Input type="password" 
                    placeholder="Пароль..." 
                    {...register('password', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Авторизоваться
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
                <StyledLink to="/register">Регистрация</StyledLink>
                
            </form>


        </div>

    );
};

export const Autorization = styled(AutorizationContainer)`
    display:    flex;
    flex-direction: column;
    align-items:   center;

    & > form {
        display:    flex;
        flex-direction: column;
        width:  260px;
    }
    

`;