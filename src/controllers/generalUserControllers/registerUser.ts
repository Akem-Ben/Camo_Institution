import { Request, Response } from "express";
import Faculty, {
  FacultyAttributes,
} from "../../models/facultyModel/facultyModel";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { v4 } from "uuid";
import Department, {
  DepartmentAttributes,
} from "../../models/departmentModel/departmentModel";
import { hashPassword } from "../../helpers/helpers";
import { sendLoginDetails } from "../../utilities/notification";

export const createUser = async (request: Request, response: Response) => {
  try {
    
    const checkUser = await User.findOne({ where: { email: request.body.email } });

    if (checkUser) {
      return response.status(400).json({
        status: `error`,
        message: `User already exists`,
      });
    }

    const department = (await Department.findOne({
      where: { id: request.body.department_id },
    })) as unknown as DepartmentAttributes;

    if(!department){
        return response.status(400).json({
            status: `error`,
            message: `Department not found`,
          });
    }

    const faculty = (await Faculty.findOne({
      where: { faculty_name: department.faculty_name },
    })) as unknown as FacultyAttributes;

    if(!faculty){
        return response.status(400).json({
            status: `error`,
            message: `Faculty not found`,
          });
    }

    let Id_no: string = "";

    if (request.body.user_type === "Lecturer") {
      const lecturers = await User.findAll({
        where: { user_type: "Lecturer" },
      });
      if (lecturers.length === 0) {
        Id_no = "CU/LC/1010101";
      } else {
        const getIds = lecturers.map((a: any) => a.userID_no);
        for (let index = 0; index < getIds.length; index++) {
          getIds[index] = Number(getIds[index].split("/")[2]);
        }
        getIds.sort((a, b) => b - a);
        const incrementId = getIds[0] + 1
        Id_no = `CU/LC/${incrementId}`;
      }

      let newLastName = request.body.last_name.toLowerCase()

      const passwordHash = await hashPassword(newLastName)
    
      const newUser = (await User.create({
        id: v4(),
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        user_type: request.body.user_type,
        faculty_id: faculty.id,
        department_id: request.body.department_id,
        userID_no: Id_no,
        password: passwordHash,
      })) as unknown as UserAttributes;

      const confirm_user = (await User.findOne({
        where: { id: newUser.id },
      })) as unknown as UserAttributes;
  
      if (!confirm_user) {
        return response.status(400).json({
          status: `error`,
          message: `Unable to create user`,
        });
      }
  
      let mailingDetails = {
          email: confirm_user.email,
          registration_number: confirm_user.userID_no
      }
  
      await sendLoginDetails(mailingDetails)
  
  
      return response.status(200).json({
        status: `success`,
        message: `User created successfully`,
        confirm_user,
      });
      
    } else if (request.body.user_type === "Student") {
        if(request.body.level === undefined || request.body.level === null || request.body.level.length === 0){
            return response.status(400).json({
                status: `error`,
                message: `Student level cannot be empty`
            })
        }
      const students = await User.findAll({ where: { user_type: "Student" } });
      if (students.length === 0) {
          Id_no = "CU/ST/1010101";
        } else {
            const getIds = students.map((a: any) => a.userID_no);
            for (let index = 0; index < getIds.length; index++) {
                getIds[index] = Number(getIds[index].split("/")[2]);
            }
            getIds.sort((a, b) => b - a);
            const incrementId = getIds[0] + 1
            Id_no = `CU/ST/${incrementId}`;
      }

      let newLastName = request.body.last_name.toLowerCase()

      const passwordHash = await hashPassword(newLastName)
    
      const newUser = (await User.create({
        id: v4(),
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        user_type: request.body.user_type,
        level: request.body.level,
        faculty_id: faculty.id,
        department_id: request.body.department_id,
        userID_no: Id_no,
        password: passwordHash,
      })) as unknown as UserAttributes;

      const confirm_user = (await User.findOne({
        where: { id: newUser.id },
      })) as unknown as UserAttributes;
  
      if (!confirm_user) {
        return response.status(400).json({
          status: `error`,
          message: `Unable to create user`,
        });
      }
  
      let mailingDetails = {
          email: confirm_user.email,
          registration_number: confirm_user.userID_no
      }
  
      await sendLoginDetails(mailingDetails)
  
  
      return response.status(200).json({
        status: `success`,
        message: `User created successfully`,
        confirm_user,
      });

    }

  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};

