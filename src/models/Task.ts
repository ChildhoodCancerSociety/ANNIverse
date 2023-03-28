import { Sequelize, Model, DataTypes} from 'sequelize';
import sequelize from './db';
// const sequelize = new Sequelize('sqlite: :memory:')

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deadline: DataTypes.DATE,
  status: DataTypes.STRING,
  // assigned_users: User[]
})

// ASSOCIATIONS
// a task can be assigned to many users
// @ts-expect-error
Task.belongsToMany("User") 
// OR Task.hasOne(User)
