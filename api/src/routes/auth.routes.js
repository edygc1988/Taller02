import { Router } from 'express'
import * as authCtrl from '../controllers/auth.controller'
const router = Router()

router.post('/signin', authCtrl.sign_in)
router.post('/signup', authCtrl.sign_up)

export default router
