import { ACTION_TYPE } from '../actions';
import { ROLE } from '../bff/constants/role';

const initialUserState = {
    id: null,
    login:  null,
    roleId: ROLE.GUEST,
    session:    null,

};

export const userReducer = (state = initialUserState, action) => {
    
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                registeredAt: action.registeredAt,
                roleId: action.payload.roleId,
                session:    action.payload.session

            }
        }
        case ACTION_TYPE.LOGOUT: {
            
 
            return initialUserState;
        }

        default:
            return state;
    }
       
};