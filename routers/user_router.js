const express =require("express")
const router  = express.Router()
const {
    Register,Login,getUser,getAllUser,adminUser,unAdminUser
    ,editData,deleteOneData,deleteAllData,loginOut,add_bouns,getMe,edit_bonus,delete_bonus,changePassword}=require("../controllers/user")
const { auth,adminAuth }=require("../middleware/auth")


router.post('/register',Register)
router.post('/login',Login)
router.get('/get_user/:id',adminAuth,getUser)
router.get('/get_me',auth,getMe)
router.get('/get_all_user',adminAuth,getAllUser)
router.patch('/edit_data/:id',editData)
router.patch('/admin/:id',adminAuth,adminUser)
router.patch('/unadmin/:id',adminAuth,unAdminUser)
router.delete('/delete/:id',adminAuth,deleteOneData)
router.delete('/delete_all_student',adminAuth,deleteAllData)
router.delete('/login_out',loginOut)
router.post('/add_bonus/:id',adminAuth,add_bouns)
router.put('edit_bonus/:id/:award_id',adminAuth, edit_bonus);
router.delete('/delete_bonus/:id/:award_id',adminAuth, delete_bonus);
router.patch('/change_password',changePassword)








module.exports = router;


