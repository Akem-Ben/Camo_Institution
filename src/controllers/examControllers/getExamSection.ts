import { Response, Request } from "express";
import User from "../../models/userModel/userModel";
import Course from "../../models/courseModel/courseModel";
import Questions from "../../models/questionModel/questionModel";
import ExamSection from "../../models/examSectionModel/examSection";

export const getExamSection = async (request: Request, response: Response) => {
  try {

    const { course_id } = request.params;
    const getSection = await ExamSection.findOne({where: {course_id}})

    if(!getSection){
        return response.status(404).json({
            status: `error`,
            message: `Section not found, check again`
        })
}

// const getExam = await Questions.findAll({where: {course_id}})

// if(!getExam){
//     return response.status(404).json({
//         status: `error`,
//         message: `No exam found for this course`
//       });
  
// }
    return response.status(200).json({
      status: `success`,
      message: `Section fetched successfully`,
      getSection
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};