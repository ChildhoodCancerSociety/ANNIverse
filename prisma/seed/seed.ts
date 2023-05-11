const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Mia Howlader',
      email: 'miaislost@gmail.com',
      role: 'SoftwareDev',
    },
  })
  console.log(newUser)
}

createUser()
  .then(() => console.log('User created successfully!'))
  .catch((error) => console.error('Error creating user:', error))
