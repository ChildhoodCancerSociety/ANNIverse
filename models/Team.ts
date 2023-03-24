import { Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('sqlite: :memory:')

// team class

const Team = sequelize.define ('Team', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  }
  name: TeamName,
  description: DataTypes.STRING,
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

// a team can have many users, meetings, and tasks