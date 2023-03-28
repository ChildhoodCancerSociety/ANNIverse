import { Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('postgresql://postgres:glmrfdsk@localhost:5432/ecmoconnect?schema=public');

export default sequelize;
