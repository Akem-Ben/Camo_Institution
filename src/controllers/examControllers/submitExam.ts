import { Response, NextFunction } from "express";
import Course from "../../models/courseModel/courseModel";
import Answer from "../../models/answerModel/answer";
import { v4 } from "uuid";
import { Responses } from "../../models/studentResponseModel/studentResponse";
import { JwtPayload } from "jsonwebtoken";
import Enrollment from "../../models/enrollmentModel/enrollment";
import { where } from "sequelize/types/sequelize";
import User from "../../models/userModel/userModel";
import { markExams } from "../../helpers/helpers";


export const submitExam = async (request: JwtPayload, response: Response, next: NextFunction) => {
    try{

        const {course_id} = request.params;

        const findCourse = await Course.findOne({where: {id: course_id}});

        if(!findCourse){
            return response.status(404).json({
                status: `error`,
                message: `Course not found`
            })
        }

        const checkPastResponse = await Responses.findOne({where: {course_id: course_id, student_id: request.user.id}});

        if(checkPastResponse){
            return response.status(400).json({
                status: `error`,
                message: `You have already submitted this exam`
            })
        }
        
        for(let index = 0; index<request.body.length; index++){
            const answer = request.body[index];
            if(answer.answer_text === "" || answer.answer_text === null){
                return response.status(400).json({
                    status: `error`,
                    message: `Answer text is required`
                })
            }
            
            const newAnswer = await Responses.create({
                id: v4(),
                question_id: answer.question_id,
                course_id: course_id,
                response_text: answer.answer_text,
                response_score: 0,
                student_id: request.user.id
            });
            
        }
        
    const checkAnswers = await Responses.findAll({where: {course_id: course_id, student_id: request.user.id}});

    if(checkAnswers && checkAnswers.length > 0){

        await Enrollment.update({isExamWritten:true}, {where: {course_id, student_id: request.user.id}})

       await markExams(request.user.id, course_id)

        return response.status(200).json({
            status: `success`,
            message: `Exam submitted successfully`,
            checkAnswers
        })

    }

    return response.status(400).json({
        status: `error`,
        message: `Exam not submitted, try again`
    }) 


    }catch(error: any){
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, contact admin please`
        })
}
}