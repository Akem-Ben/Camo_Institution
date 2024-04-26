import { Request, Response } from "express";
import { v4 } from "uuid";
import Course, { CourseAttributes, examReady } from "../../models/courseModel/courseModel";
import ExamSection, { ExamSectionAttributes } from "../../models/examSectionModel/examSection";
import Questions, { QuestionAttributes, QuestionType } from "../../models/questionModel/questionModel";

export const createExam = async (request: Request, response: Response) => {
  try {

    const course = (await Course.findOne({
      where: { id: request.body.course_id },
    })) as unknown as CourseAttributes;

    if(!course){
        return response.status(400).json({
            status: `error`,
            message: `Course not found, check again`,
          });
    }

    const section = (await ExamSection.findOne({
      where: { id: request.body.section_id },
    })) as unknown as ExamSectionAttributes;

    if(!section){
        return response.status(400).json({
            status: `error`,
            message: `Exam section not found`,
          });
    }

    const checkExam = await Questions.findOne({where: {course_id: request.body.course_id}})
    
    if(checkExam){
        return response.status(400).json({
            status: `error`,
            message: `Exam already created for this course`,
          });
    }


    let examsArray = request.body.questions
     for(let index = 0; index<examsArray.length; index++){

        const newExam = await Questions.create({
            id: v4(),
            type: QuestionType.MULTIPLE_CHOICE,
            question: examsArray[index].question,
            course_id: request.body.course_id,
            section_id: request.body.section_id,
            score: examsArray[index].score,
            answer: examsArray[index].answer
        })



     }

      const confirm_questions = (await Questions.findAll({
        where: { course_id: request.body.course_id },
      })) as unknown as QuestionAttributes;
  
      if (!confirm_questions) {
        return response.status(400).json({
          status: `error`,
          message: `Unable to create exams`,
        });
      }
  
      await Course.update({isExamReady: examReady.YES}, {where: {id: request.body.course_id}})
  
      return response.status(200).json({
        status: `success`,
        message: `Exams created successfully`,
        confirm_questions,
      });

  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};

