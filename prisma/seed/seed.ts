const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser() {
  const newUser = await prisma.user.createMany({
    data: [
      {
        handle: "a",
        first_name: 'Mia',
        last_name: 'Howlader',
        email: 'miaislost@gmail.com',
        // role: 'SoftwareDev',
      },
      {
        handle: "b",
        first_name: 'Craig',
        last_name: ' McGreg',
        email: 'cmcgreg@gmail.com',
        // role: 'Volunteer',
      },
      {
        handle: "c",
        first_name: 'Ryan',
        last_name: ' Reynolds' ,
        email: 'rreynoldsy@gmail.com',
        // role: 'PM',
      },
      {
        handle: "d",
        first_name: 'Frank',
        last_name:'the Tank' ,
        email: 'ftt@gmail.com',
        // role: 'SoftwareDev',
      },
      {
        handle: "e",
        first_name: 'Tony',
        last_name: ' Stark' ,
        email: 'tstark@gmail.com',
        // role: 'SoftwareDev',
      },
      {
        handle: "f",
        first_name: 'Drew',
        last_name: 'Barymore' ,
        email: 'db@gmail.com',
        // role: 'Admin',
      },
      {
        handle: "g",
        first_name: 'Natasha',
        last_name: 'Romanoff' ,
        email: 'nromanoffb@gmail.com',
        // role: 'Volunteer',
      },
  ]
  })
  console.log(newUser)
}

createUser()
  .then(() => console.log('User created successfully!'))
  .catch((error) => console.error('Error creating user:', error))

//   async function createTasks() {
//     const newTasks = await prisma.task.createMany({
//       data: [
//         {
//           title: "Create Button",
//           description: "Make buttons based on figma doc",
//           status: "on going",  
//         },
//         {
//           title: "Create Form",
//           description: "Make forms based on figma doc",
//           status: "complete",  
//         },
//         {
//           title: "Create User",
//           description: "Make users ",
//           status: "on going",  
//         },
//         {
//           title: "Create Task",
//           description: "Make tasks ",
//           status: "on going",  
//         },
//         {
//           title: "Create meeting",
//           description: "Make meetings ",
//           status: "on going",  
//         },
//         {
//           title: "Give Hi-Fives",
//           description: "slap them hands",
//           status: "mission completed",  
//         },
      

//       ]
//     })
     
      
//     console.log(newTasks)
//   }

// createTasks()
// .then(() => console.log('Tasks created successfully!'))
// .catch((error) => console.error('Error creating tasks:', error))

// async function UserTasks (){
//   const newUserTasks = await prisma.usertasks.createMany({
//     data: [
//       {

//       },
//     ]
//   })
// }

// async function Team(){
//   const newTeams = await prisma.team.createMany({
//     data:[
//       {

//       },
//     ]
//   })
// }