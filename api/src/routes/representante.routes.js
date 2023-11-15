import { Router } from "express"

import * as representanteCtrl from '../controllers/representante.controller'
import { auth_jwt } from '../middlewares'

const router = Router()

router.get('/representante', [auth_jwt.verify_token, auth_jwt.is_admin], representanteCtrl.redirectRep)

router.get('/home', [auth_jwt.verify_token, auth_jwt.is_user], representanteCtrl.redirectHom)
///router.get('/', auth_jwt.verify_token, productCtrl.getProducts)
//router.post('/', [auth_jwt.verify_token, auth_jwt.is_admin], productCtrl.createProduct)

export default router