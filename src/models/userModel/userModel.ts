import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export enum user_type {
  LECTURER = "Lecturer",
  USER = "Student",
}

export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  level?:string;
  faculty_id: string;
  department_id: string;
  userID_no: string;
  password: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.ENUM(...Object.values(user_type)),
      allowNull: false,
    },
    faculty_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userID_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
  },
  {
    sequelize: database,
    tableName: "User",
  }
);

export default User;