import { Response, Request } from "express";
import User from "../../models/userModel/userModel";

export const getAllUsers = async (request: Request, response: Response) => {
  try {

    const allUsers = await User.findAll({})
    if(allUsers){
    if(allUsers.length === 0){
        return response.status(404).json({
            status: `success`,
            message: `No Users found`,
            allUsers
        })
    }else{
        return response.status(200).json({
            status: `success`,
            message: `Users found successfully`,
            allUsers
        })
    }
}
    return response.status(400).json({
      status: `error`,
      message: `Unable to find Users, try again`,
    });


  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
