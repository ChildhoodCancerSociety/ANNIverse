import { Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('postgresql://postgres:glmrfdsk@localhost:5432/ecmoconnect?schema=public');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

export default sequelize;
