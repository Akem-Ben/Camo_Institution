import { Response, Request } from "express";
import Faculty, {
  FacultyAttributes,
} from "../../models/facultyModel/facultyModel";
import Department, {
  DepartmentAttributes,
} from "../../models/departmentModel/departmentModel";
import { v4 } from "uuid";

export const createDepartment = async (
    request: Request,
  response: Response
) => {
  try {
    const { faculty_name, department_name } = request.body;

    const checkFaculty = (await Faculty.findOne({
      where: { faculty_name },
    })) as unknown as FacultyAttributes;

    if (!checkFaculty) {
      return response.status(400).json({
        status: `error`,
        message: `Faculty does not exist`,
      });
    }

    const checkDepartment = await Department.findOne({
      where: { faculty_name, department_name },
    });

    if (checkDepartment) {
      return response.status(400).json({
        status: `error`,
        message: `This Department already exists in this faculty`,
      });
    }

    const createdDepartment = (await Department.create({
      id: v4(),
      institution_name: checkFaculty.institution_name,
      faculty_name,
      department_name,
    })) as unknown as DepartmentAttributes;

    const findDepartment = (await Department.findOne({
      where: {
        institution_name: checkFaculty.institution_name,
        id: createdDepartment.id,
        faculty_name,
        department_name,
      },
    })) as unknown as DepartmentAttributes;

    if (findDepartment) {
      return response.status(200).json({
        status: `success`,
        message: `Department created successfully`,
        findDepartment,
      });
    }

    return response.status(400).json({
      status: `error`,
      message: `Unable to create Department, try again`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
