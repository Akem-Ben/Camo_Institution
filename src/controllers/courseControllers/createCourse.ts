import { Response, Request } from "express";
import { v4 } from "uuid";
import Course, { CourseAttributes } from "../../models/courseModel/courseModel";
import Department from "../../models/departmentModel/departmentModel";
import User from "../../models/userModel/userModel";

export const createCourse = async (request: Request, response: Response) => {
  try {
    const { title, course_code, credit_unit, level, semester, session, lecturer_id, department_id, faculty_id } = request.body;

    const checkDepartment = await Department.findOne({
      where: { id: department_id },
    });

    if (!checkDepartment) {
      return response.status(400).json({
        status: `error`,
        message: `Department does not exist`,
      });
    }

    const checkCourse = await Course.findOne({
      where: { department_id, course_code },
    });

    if (checkCourse) {
      return response.status(400).json({
        status: `error`,
        message: `This Course already exists in this department`,
      });
    }

    const checkLecturer = await User.findOne({where: {id:lecturer_id, }})
    if(!checkLecturer){
        return response.status(400).json({
            status: `error`,
            message: `Lecturer does not exist`,
          });
    }

    const createdCourse = (await Course.create({
        id: v4(),
        title,
        course_code,
        credit_unit,
        semester,
        session,
        department_id,
        level,
        lecturer_id,
        faculty_id,
        isExamReady: "No"
    })) as unknown as CourseAttributes

    const findCourse = (await Course.findOne({
      where: { department_id, id: createdCourse.id, course_code, credit_unit },
    })) as unknown as CourseAttributes;

    if (findCourse) {
      return response.status(200).json({
        status: `success`,
        message: `Course created successfully`,
        findCourse,
      });
    }

    return response.status(400).json({
      status: `error`,
      message: `Unable to create Course, try again`,
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
