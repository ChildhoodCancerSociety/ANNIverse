import { Sequelize, Model, DataTypes} from 'sequelize';

// const sequelize = new Sequelize('sqlite: :memory:')
import sequelize from './db';


export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  // teams: Team[],
  // tasks: Task[],
  // meetings: Meeting[]
})

// ASSOCIATIONS
// a user can belong to many teams, have many tasks, and be assigned to many meetings
// @ts-expect-error
User.belongsToMany("Team");
// @ts-expect-error

User.hasMany("Task");
// @ts-expect-error

User.hasMany("Meeting");
