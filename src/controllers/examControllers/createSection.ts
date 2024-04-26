import { Request, Response } from "express";
import { v4 } from "uuid";
import Course, { CourseAttributes } from "../../models/courseModel/courseModel";
import ExamSection, { ExamSectionAttributes } from "../../models/examSectionModel/examSection";

export const createExamSection = async (request: Request, response: Response) => {
  try {

    const {section_name, course_id, total_score, instructions, duration} = request.body

    const course = (await Course.findOne({
      where: { id: course_id },
    })) as unknown as CourseAttributes;

    if(!course){
        return response.status(400).json({
            status: `error`,
            message: `Course not found, check again`,
          });
    }

    const section = (await ExamSection.findOne({
      where: { section_name },
    })) as unknown as ExamSectionAttributes;

    if(section){
        return response.status(400).json({
            status: `error`,
            message: `Exam section already created`,
          });
    }

        const newExamSection = await ExamSection.create({
            id: v4(),
            section_name,
            course_id,
            total_score,
            instructions,
            duration
        }) as unknown as ExamSectionAttributes;

      const confirm_section = (await ExamSection.findOne({
        where: { id: newExamSection.id },
      })) as unknown as ExamSectionAttributes;
  
      if (!confirm_section) {
        return response.status(400).json({
          status: `error`,
          message: `Unable to create section`,
        });
      }
  
  
      return response.status(200).json({
        status: `success`,
        message: `section created successfully`,
        confirm_section,
      });

  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};

