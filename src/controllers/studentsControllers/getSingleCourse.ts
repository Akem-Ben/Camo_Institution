import { Response, Request, NextFunction } from "express";
import Course, { CourseAttributes } from "../../models/courseModel/courseModel";

export const getASingleCourse = async (request: Request, response: Response, next:NextFunction) => {
  try {

    const {course_id} = request.params;
    const course = await Course.findOne({where: {id:course_id}}) as unknown as CourseAttributes

    if(!course){
        return response.status(404).json({
            status: `error`,
            message: `Course does not exist`
        })
    }

    return response.status(200).json({
      status: `success`,
      message: `Course fetched successfully`,
      course
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
