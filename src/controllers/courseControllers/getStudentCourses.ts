import { Response } from "express"
import Course, { CourseAttributes } from "../../models/courseModel/courseModel"
import { JwtPayload } from "jsonwebtoken"
import Department, { DepartmentAttributes } from "../../models/departmentModel/departmentModel"

export const getAllCoursesInDepartment = async (request: JwtPayload, response: Response) => {
    try {
        const { department_id, level, session, semester } = request.query

        const allDepartmentalCourses: any = await Course.findAll({ where: { department_id: department_id, level: level, semester: semester, session: session } }) as unknown as CourseAttributes

        let coursesWithDepartments:CourseAttributes[] = []

        if (allDepartmentalCourses) {
            if (allDepartmentalCourses.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No courses found`,
                    coursesWithDepartments
                });
            } else {

    coursesWithDepartments = await Promise.all(
        allDepartmentalCourses.map(async (course: CourseAttributes) => {
          const departments = (await Department.findOne({
            where: {
              id: course.department_id,
            },
          })) as unknown as DepartmentAttributes;
          return {
            ...course,
            departmentName: departments.department_name
          }
        })
      );
                return response.status(200).json({
                    status: `success`,
                    message: `Courses found successfully`,
                    coursesWithDepartments
                })
            }
        }

        return response.status(400).json({
            status: `error`,
            message: `Unable to find courses, try again`
        })
        
    } catch (error: any) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, contact admin please`,
        });
    }
}