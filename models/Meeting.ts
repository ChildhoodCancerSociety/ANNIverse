import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')


const Meeting = sequelize.define('Meeting', {
  title: {
    type: DataTypes.STRING,
    allowNull: false},
  description: {
    type: DataTypes.STRING,
    allowNull: false},
  date: DataTypes.DATE,
  time: DataTypes.DATE,
  users: User[],
  teams: Team[],
})

// ASSOCIATIONS
// a meeting can be assigned to many users and teams
Meeting.belongsToMany(User);
Meeting.belongsToMany(Team);


