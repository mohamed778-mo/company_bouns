const express =require("express")
const router  = express.Router()
const {
    Register,Login,getUser,getAllUser,adminUser,unAdminUser
    ,editData,deleteOneData,deleteAllData,
    loginOut,getMe,changePassword,
  add_bouns_echo,
  edit_bonus_echo,
  delete_bonus_echo,
  add_bouns_absence,
  edit_bonus_absence,
  delete_bonus_absence,
  add_bouns_readiness,
  edit_bonus_readiness,
  delete_bonus_readiness,
  add_bouns_presence,
  edit_bonus_presence,
  delete_bonus_presence}=require("../controllers/user")
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
router.patch('/change_password',changePassword)

router.post('/add_bonus_echo/:id',adminAuth,add_bouns_echo)
router.put('/edit_bonus_echo/:id/:award_id',adminAuth, edit_bonus_echo);
router.delete('/delete_bonus_echo/:id/:award_id',adminAuth, delete_bonus_echo);

router.post('/add_bonus_absence/:id',adminAuth,add_bouns_absence)
router.put('/edit_bonus_absence/:id/:award_id',adminAuth, edit_bonus_absence);
router.delete('/delete_bonus_absence/:id/:award_id',adminAuth, delete_bonus_absence)


router.post('/add_bonus_presence/:id',adminAuth,add_bouns_presence)
router.put('/edit_bonus_presence/:id/:award_id',adminAuth, edit_bonus_presence);
router.delete('/delete_bonus_presence/:id/:award_id',adminAuth, delete_bonus_presence)

router.post('/add_bonus_readiness/:id',adminAuth,add_bouns_readiness)
router.put('/edit_bonus_readiness/:id/:award_id',adminAuth, edit_bonus_readiness);
router.delete('/delete_bonus_readiness/:id/:award_id',adminAuth, delete_bonus_readiness)

module.exports = router;


