import { Sequelize, Model, DataTypes} from 'sequelize';
import sequelize from './db';

// const sequelize = new Sequelize('sqlite: :memory:')

export const Meeting = sequelize.define('Meeting', {
  title: {
    type: DataTypes.STRING,
    allowNull: false},
  description: {
    type: DataTypes.STRING,
    allowNull: false},
  date: DataTypes.DATE,
  time: DataTypes.DATE,
  // users: User[],
  // teams: Team[],
})

// ASSOCIATIONS
// a meeting can be assigned to many users and teams
export const associate = () => {
  // @ts-expect-error
  Meeting.belongsToMany("User");
  // @ts-expect-error
  Meeting.belongsToMany("Team");
};
