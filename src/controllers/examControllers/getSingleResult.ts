import { Response, Request } from "express";
import Course from "../../models/courseModel/courseModel";
import Questions, { QuestionAttributes } from "../../models/questionModel/questionModel";
import Responses, { ResponseAttributes } from "../../models/studentResponseModel/studentResponse";
import Enrollment, { EnrollmentAttributes } from "../../models/enrollmentModel/enrollment";
import ExamSection, { ExamSectionAttributes } from "../../models/examSectionModel/examSection";

export const getSingleResult = async (request: Request, response: Response) => {
  try {

    const { course_id } = request.params;
    const getCourse = await Course.findOne({where: {id:course_id}})

    if(!getCourse){
        return response.status(404).json({
            status: `error`,
            message: `Course not found, check again`
        })
}

const getQuestions:any = await Questions.findAll({where: {course_id}}) as unknown as QuestionAttributes

        if(!getQuestions || !getQuestions.length){
            return response.status(404).json({
                status: `error`,
                message: `No exam found for this course`
            });
        
        }

        const outPutArray = getQuestions.map((question: QuestionAttributes) => {
            return {
                question_id: question.id,
                question_text: question.question.question_body,
                options: question.question.options,
                correct_answer: question.answer,
            }
        })

        const studentResponses:any = await Responses.findAll({where: {course_id}}) as unknown as ResponseAttributes

        studentResponses.map((student_response:ResponseAttributes) => {
            outPutArray.map((question:any) => {
                if(student_response.question_id === question.question_id){
                    question.student_answer = student_response.response_text
                }
            })
        })

        const getEnrollment = await Enrollment.findOne({where: {course_id}}) as unknown as EnrollmentAttributes

        const total_score = getEnrollment.total_score

        const getSection = await ExamSection.findOne({where: {course_id}}) as unknown as ExamSectionAttributes

        const section_score = getSection.total_score

        return response.status(200).json({
            status: `success`,
            messsage: `Student Result successfully fetched`,
            outPutArray,
            student_score: total_score,
            section_score
        })


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
