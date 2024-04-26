import { Response, Request } from "express";
import User from "../../models/userModel/userModel";

export const getAllStudentsInInstitution = async (request: Request, response: Response) => {
  try {

    const allStudents = await User.findAll({where: {user_type: "Student"}})
    if(allStudents){
    if(allStudents.length === 0){
        return response.status(404).json({
            status: `success`,
            message: `No Students found`,
            allStudents
        })
    }else{
        return response.status(200).json({
            status: `success`,
            message: `Students found successfully`,
            allStudents
        })
    }
}
    return response.status(400).json({
      status: `error`,
      message: `Unable to find Students, try again`,
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
