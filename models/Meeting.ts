import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

// meeting class

const Meeting = sequelize.define('Meeting', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATE,
  time: DataTypes.DATE,
  users: User[],
  teams: Team[],
})

// a meeting can be assigned to many users and teams

