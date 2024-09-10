export const transformUser = (dbUser) => ({
    
    id: dbUser.id,
    login:  dbUser.login,
    password:   dbUser.password,
    registeredAt:    dbUser.registred_at,
    roleId: dbUser.role_id,
  

});