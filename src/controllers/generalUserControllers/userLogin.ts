import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateToken } from "../../helpers/helpers";
import Department, { DepartmentAttributes } from "../../models/departmentModel/departmentModel";
import Faculty from "../../models/facultyModel/facultyModel";

export const userLogin = async (request: Request, response: Response) => {
  try {
    const { reg_no, password } = request.body;


    const subuser = (await User.findOne({
      where: { userID_no: reg_no },
    })) as unknown as UserAttributes;

    if (!subuser) {
      return response.status(404).json({
        status: `error`,
        message: `Registration number ${reg_no} does not exist`,
      });
    }

    const validate = await bcrypt.compare(password, subuser.password);

    if (!validate) {
      return response.status(400).json({
        status: `error`,
        message: `Incorrect Password`,
      });
    }

    const data = {
      id: subuser.id,
      email: subuser.email,
    };

    const token = generateToken(data);

    const department = await Department.findOne({where: {id:subuser.department_id}}) as unknown as DepartmentAttributes

    const user = {...subuser, departmentName: department.department_name, facultyName: department.faculty_name}

    return response.status(200).json({
      message: `Welcome back ${subuser.first_name}`,
      token,
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({
      status: `error`,
      method: request.method,
      message: error.message,
    });
  }
};
