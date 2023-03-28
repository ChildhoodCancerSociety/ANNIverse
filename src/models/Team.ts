import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
import sequelize from './db';


const Team = sequelize.define ('Team', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  },
  name: DataTypes.STRING,
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // users: User[],
  // meetings: Meeting[],
  // tasks: Task[]
})


enum TeamName {
  communications = 'Communcations',
  softwareDevelopment = 'Software Development',
  design = 'Design',
  admin = 'Admin'
}

// ASSOCIATIONS
// a team can have many users, meetings, and tasks
// @ts-expect-error
Team.hasMany("User")
// @ts-expect-error
Team.hasMany("Meeting")
// @ts-expect-error
Team.hasMany("Task")
