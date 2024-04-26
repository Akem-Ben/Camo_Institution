import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Enrollment, { EnrollmentAttributes } from "../../models/enrollmentModel/enrollment";

export const getAllResults = async (request: JwtPayload, response: Response) => {
  try {

    const student_id = request.user.id;
    const getStudentEnrollments: any | undefined = await Enrollment.findAll({where: {student_id}}) as unknown as EnrollmentAttributes

    if (!getStudentEnrollments || getStudentEnrollments.length === 0) {
        return response.status(404).json({
          status: "error",
          message: "Not enrolled in any courses, please check again"
        });
      }

      const allResults = getStudentEnrollments.map((course: EnrollmentAttributes) => {
        return {
          course_id: course.course_id,
          course_code: course.course_code,
          students_score: course.total_score,
          exam_written: course.isExamWritten,
        };
      });

      if(allResults.length > 0){
      return response.status(200).json({
        status: "success",
        allResults
      });
    }

      return response.status(404).json({
        status: "error",
        message: "No results found",
        allResults
      });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
