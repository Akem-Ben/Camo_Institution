import { Response, Request } from "express";
import User from "../../models/userModel/userModel";

export const getAllLecturersInInstitution = async (request: Request, response: Response) => {
  try {

    const allLecturers = await User.findAll({where: {user_type: "Lecturer"}})
    if(allLecturers){
    if(allLecturers.length === 0){
        return response.status(404).json({
            status: `success`,
            message: `No Lecturers found`,
            allLecturers
        })
    }else{
        return response.status(200).json({
            status: `success`,
            message: `Lecturers found successfully`,
            allLecturers
        })
    }
}
    return response.status(400).json({
      status: `error`,
      message: `Unable to find Lecturers, try again`,
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
