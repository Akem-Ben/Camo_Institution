import { Response } from "express";
import { v4 } from "uuid";
import User from "../../models/userModel/userModel";
import Enrollment, {
  EnrollmentAttributes,
} from "../../models/enrollmentModel/enrollment";
import { JwtPayload } from "jsonwebtoken";
import { CourseAttributes } from "../../models/courseModel/courseModel";

export const enrollCourses = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    let { courses } = request.body;

    courses = JSON.parse(courses)

    const studentId = request.user.id;
    const studentExist = await User.findOne({ where: { id: studentId } });
    if (!studentExist) {
      return response.status(400).json({
        status: `error`,
        message: `Student does not exist`,
      });
    }

    if (!courses) {
      return response.status(400).json({
        status: `error`,
        message: `No course selected`,
      });
    }

    let counter = courses
      .filter((course: any) => Number(course.credit_unit))
      .reduce(
        (accumulator: number, current: number) => accumulator + current,
        0
      );

    if (counter > 30) {
      return response.status(400).json({
        status: `error`,
        message: `Maximum credit units exceeded`,
      });
    }
    let checkEnrollment: string[] = []

     await Promise.all(
      courses.map(async (course: CourseAttributes) => {
        const enrollment = (await Enrollment.findOne({
          where: {
            student_id: studentId,
            course_id: course.id,
            course_code: course.course_code,
            course_title: course.title,
            department_id: course.department_id,
          },
        })) as unknown as EnrollmentAttributes;

        if (enrollment !== null) {
          checkEnrollment.push(enrollment.course_code)
        }
      })
      );
      
    if (checkEnrollment.length > 0) {
      return response.status(406).json({
        status: `error`,
        message: `Already enrolled in the following courses`,
        checkEnrollment
      });
    }
    let enrolledCoursesArray: EnrollmentAttributes[] = [];

    for (let index = 0; index < courses.length; index++) {
      const newCourse = (await Enrollment.create({
        id: v4(),
        student_id: studentId,
        course_id: courses[index].id,
        course_code: courses[index].course_code,
        course_title: courses[index].title,
        lecturer_id: courses[index].lecturer_id,
        department_id: courses[index].department_id,
        session: courses[index].session,
        semester: courses[index].semester,
        total_score: 0,
        isExamWritten: false,
      })) as unknown as EnrollmentAttributes;

      enrolledCoursesArray.push(newCourse);
    }

    if (enrolledCoursesArray.length > 0) {
      return response.status(200).json({
        status: `success`,
        message: `courses successfully enrolled.`,
        enrolledCoursesArray,
      });
    }

    return response.status(400).json({
      status: `error`,
      message: `Enrollment failed, Contact Students Affairs Division`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, Contact Students Affairs Division please`,
    });
  }
};
