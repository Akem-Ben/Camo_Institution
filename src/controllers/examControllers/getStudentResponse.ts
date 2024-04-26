import { Response, Request } from "express";
import User from "../../models/userModel/userModel";
import Course from "../../models/courseModel/courseModel";
import Questions from "../../models/questionModel/questionModel";
import Responses from "../../models/studentResponseModel/studentResponse";

export const getStudentResponse = async (request: Request, response: Response) => {
  try {

    const { course_id } = request.params;
    const {student_id} = request.query;

    if(!student_id){
        return response.status(404).json({
            status: `error`,
            message: `Student id not found, check again`
        })
    }

    const getCourse = await Course.findOne({where: {id:course_id}})

    if (!getCourse) {
        return response.status(404).json({
            status: `error`,
            message: `Course not found, check again`
        });
    }

    const getStudent = await User.findOne({
        where: { id: student_id as string, user_type: `Student` }
    });

    if (!getStudent) {
        return response.status(404).json({
            status: `error`,
            message: `Student not found, check again`
        });
    }

const fetchStudentResponse = await Responses.findAll({where: {course_id, student_id: student_id as string}})

if(!fetchStudentResponse){
    return response.status(404).json({
        status: `error`,
        message: `No Answer found for this student`,
      });
  
}
    return response.status(200).json({
      status: `success`,
      message: `Answers fetched successfully`,
      fetchStudentResponse
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
