import { Router } from "express";
import { 
    createUser, 
    getAllActiveUsers, 
    getAllUsersIncludeDeleted, 
    getUsersByFilters, 
    getActiveUserById, 
    updateUser, 
    deleteUser,
    restoreUser,
    getUserByIdIncludeDeleted,
    physicDeleteUser } 
    from "../controllers/usuario.controller.js";



    const router = Router()

    router.post('/', createUser);
    router.get('/', getAllActiveUsers);
    router.get('/filter', getUsersByFilters);
    router.get('/:id', getActiveUserById);
    router.put('/:id', updateUser)
    router.delete('/:id', deleteUser);
    router.patch('/:id', restoreUser)
    
    router.get('/admin/', getAllUsersIncludeDeleted);
    router.get('/admin/:id', getUserByIdIncludeDeleted)
    router.delete('/admin/:id',  physicDeleteUser)
    
    export default router;