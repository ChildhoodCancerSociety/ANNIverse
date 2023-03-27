import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  }
  name: {
    type: DataTypes.STRING,
    allowNull: false},
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  teams: Team[],
  tasks: Task[],
  meetings: Meeting[]
})

// ASSOCIATIONS
// a user can belong to many teams, have many tasks, and be assigned to many meetings
User.belongsToMany(Team);
User.hasMany(Task);
User.hasMany(Meeting);
