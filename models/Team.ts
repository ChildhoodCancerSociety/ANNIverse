import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


const Team = sequelize.define ('Team', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  }
  name: TeamName,
  description: {
    type: DataTypes.STRING,
    allowNull: false},
  users: User[],
  meetings: Meeting[],
  tasks: Task[]
})


enum TeamName {
  communications = 'Communcations',
  softwareDevelopment = 'Software Development',
  design = 'Design',
  admin = 'Admin'
}

// ASSOCIATIONS
// a team can have many users, meetings, and tasks
Team.hasMany(User)
Team.hasMany(Meeting)
Team.hasMany(Task)
