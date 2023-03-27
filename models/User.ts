import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

// user class
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  }
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  teams: Team[],
  tasks: Task[],
  meetings: Meeting[]
})


// a user can belong to many teams, have many tasks, and be assigned to many meetings