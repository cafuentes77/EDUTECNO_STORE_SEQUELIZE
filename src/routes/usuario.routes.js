import { Router } from "express";
import { 
    createUser, 
    getAllActiveUsers, 
    getAllUsers, 
    getUsersByFilters, 
    getUserById, 
    getActiveUserById, 
    updateUser, 
    deleteUser,
    restoreUser
} from "../controllers/usuario.controller.js";



const router = Router()

router.post ('/usuario', createUser)
router.get ('/usuario', getAllActiveUsers)
router.get ('/usuario/filter', getUsersByFilters)
router.get ('/admin/usuario/:id', getActiveUserById)
router.put ('/admin/usuario/:id', updateUser)
router.delete ('/usuario/:id', deleteUser)
router.patch ('/usuario/:id', restoreUser)

router.get ('/admin/usuario', getAllUsers)
router.get ('/admin/usuario/:id', getUserById)



export default router