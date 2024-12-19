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
    physicDeleteUser
} from "../controllers/usuario.controller.js";



const router = Router()

router.post ('/usuario', createUser)
router.get ('/usuario', getAllActiveUsers)
router.get ('/usuario/filter', getUsersByFilters)
router.get ('/usuario/:id', getActiveUserById)
router.put ('/usuario/:id', updateUser)
router.delete ('/usuario/:id', deleteUser)
router.patch ('/usuario/:id', restoreUser)

router.get ('/admin/usuario', getAllUsersIncludeDeleted)
router.get ('/admin/usuario/:id', getUserByIdIncludeDeleted)
router.delete ('/admin/usuario/:id', physicDeleteUser)



export default router