import { Router  } from 'express'
import * as usersCtrl from './controllers.js'


const router = Router()

// GET all users
router.get('/', checkAuth, usersCtrl.index)

// GET user with given id
router.get('/:id', checkAuth, usersCtrl.show)
// PUT update user with given id 
router.put('/:id', checkAuth, usersCtrl.update)
// DELETE  delete user with given id 
router.delete('/:id', checkAuth, usersCtrl.delete)


export { router }