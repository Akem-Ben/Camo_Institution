import { Response, Request } from "express";
import Course from "../../models/courseModel/courseModel";

export const getAllCoursesInInstitution = async (
  request: Request,
  response: Response
) => {
  try {
    const allCourses = await Course.findAll({});
    if (allCourses) {
      if (allCourses.length === 0) {
        return response.status(404).json({
          status: `success`,
          message: `No courses found`,
          allCourses,
        });
      } else {
        return response.status(200).json({
          status: `success`,
          message: `Courses found successfully`,
          allCourses,
        });
      }
    }
    return response.status(400).json({
      status: `error`,
      message: `Unable to find Course, try again`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
