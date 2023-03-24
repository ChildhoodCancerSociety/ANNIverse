import { Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('sqlite: :memory:')

// task class
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    unique: true;
  }
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  deadline: DataTypes.DATE,
  status: DataTypes.STRING,
  assigned_users: User[]
})

// a task can be assigned to many users
