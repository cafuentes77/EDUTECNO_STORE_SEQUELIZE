import { Router } from "express";
import { 
    createUser, 
    getAllActiveUsers, 
    getAllUsers, 
    getUsersByFilters, 
    getUserById, 
    getActiveUserById, 
    updateUser 
} from "../controllers/usuario.controller.js";



const router = Router()

router.post ('/usuario', createUser)
router.get ('/usuario', getAllActiveUsers)
router.get ('/usuario/filter', getUsersByFilters)
router.get ('/admin/usuario/:id', getActiveUserById)
router.put ('/admin/usuario/:id', updateUser)

router.get ('/admin/usuario', getAllUsers)
router.get ('/admin/usuario/:id', getUserById)



export default router