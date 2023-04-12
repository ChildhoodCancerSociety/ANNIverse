const express = require('express')
const router = express.Router()
const { PrismaClient } = require('prisma/client')

const prisma = new PrismaClient()



// GET ALL USERS 
const index = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: "error!"})
  }
}

// GET INDIVIDUAL USER 
const show = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await prisma.user(findUnique)({ where: { id: userId } })
    if (!user) {
  return res.status(404).json ({ error: 'user not found!'}) 
	}
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({error: 'count not retrieve user!'})
  }
}

// UPDATE INDIVIDUAL USER
const update = async (req, res) => {
  const userId = req.params.userId
  const { body } = req
  try {
    const updatedUser = await prisma.user.update({
			where: { id: userId },
    	data: {...body },
    }) 
		return res.status(200).json(updatedUser)
  } catch (error) {
	  return res.status(500).json({ error: 'couldnt update user' })
  }
}

// DELETE INDIVIDUAL USER 
const deleteUser = async (req, res) => {
  const userId = req.params.userId
  try {
    await prisma.user.delete({ where: {id: userId } })
    return res.status(200).json({ message: 'user deleted' })
  } catch (error) {
    return res.status(500).json({ error: 'failed to delete user' })
  }
}


export {
	index,
	show,
	update,
	deleteUser as delete
}