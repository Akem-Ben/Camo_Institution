import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User, { UserAttributes } from '../../models/userModel/userModel';
import Enrollment, { EnrollmentAttributes } from '../../models/enrollmentModel/enrollment';
import Department, { DepartmentAttributes } from '../../models/departmentModel/departmentModel';
import Course, { CourseAttributes } from '../../models/courseModel/courseModel';


export const getEnrolledCourses = async(request: JwtPayload, response: Response) => {
    try{
        const studentId = request.user.id

        const student:UserAttributes = await User.findOne({where: {id:studentId}}) as unknown as UserAttributes

        const {semester, session} = request.query

        
        const findEnrolledCourses:any = await Enrollment.findAll({where: {student_id:studentId, session, semester, department_id:student.department_id}}) as unknown as EnrollmentAttributes

        let coursesWithDepartments:any = []

        if (findEnrolledCourses) {
            if (findEnrolledCourses.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No courses found`,
                    coursesWithDepartments
                });
            } else {

        coursesWithDepartments = await Promise.all(
            findEnrolledCourses.map(async (course: EnrollmentAttributes) => {
          const departments = (await Department.findOne({
            where: {
              id: course.department_id,
            },
          })) as unknown as DepartmentAttributes;

          const examReady = (await Course.findOne({
            where: {
                id: course.course_id
            }
          })) as unknown as CourseAttributes
          
          return {
            ...course,
            examinationStatus: examReady.isExamReady,
            departmentName: departments.department_name
          }
        })
      );

        if(findEnrolledCourses.length === 0){
            return response.status(404).json({
                status: `success`,
                message: `Not yet enrolled for any courses in this semester`,
                coursesWithDepartments
            })
        }

        return response.status(200).json({
            status: `success`,
            message: `Courses fetched`,
            coursesWithDepartments
        })
    }
    }

    return response.status(404).json({
        status: `error`,
        message: `Unable to fetch courses, contact The STudent Affairs Division`
    })

}catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, Contact Student Unit Division`
        })
    }
}