import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    unique: true;
  }
  title: {
    type: DataTypes.STRING,
    allowNull: false},
  description: {
    type: DataTypes.STRING,
    allowNull: false},
  deadline: DataTypes.DATE,
  status: DataTypes.STRING,
  assigned_users: User[]
})

// ASSOCIATIONS
// a task can be assigned to many users
Task.belongsToMany(User) 
// OR Task.hasOne(User)

