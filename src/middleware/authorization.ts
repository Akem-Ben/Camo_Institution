import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel/userModel";

export const studentAuthoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page`,
      });
    }

    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    const student:any = await User.findOne({where: {id:decode.id}})
    
    if(student === null){
      return response.status(400).json({
        status: `error`,
        message: `Login again`
      })
    }

    if(student.user_type !== 'Student'){
      return response.status(400).json({
        status: `error`,
        message: `You are not allowed to access this resource. Contact the admin`
      })
    }

    request.user = decode;
    next();
  }  catch (error: any) {
    if(error.message === 'jwt expired' || error.message === 'invalid signature'){
      return response.status(401).json({
        status: 'error',
        message: 'Session Expired. Please log in again.',
      });
    }
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error: ${error}`,
    })
  }
};

export const lecturerAuthoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page`,
      });
    }

    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    const admin:any = await User.findOne({where: {id:decode.id}})

    if(admin === null){
      return response.status(400).json({
        status: `error`,
        message: `Login again`
      })
    }

    if(admin.user_type !== 'Lecturer'){
      return response.status(400).json({
        status: `error`,
        message: `You are not allowed to access this resource. Contact the admin`
      })
    }
    request.user = decode;


    next();
  } catch (error: any) {
    if(error.message === 'jwt expired' || error.message === 'invalid signature'){
      return response.status(401).json({
        status: 'error',
        message: 'Session Expired. Please log in again.',
      });
    }
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error: ${error}`,
    })
  }
};

export const generalAuthoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page`,
      });
    }

    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    request.user = decode;


    next();
    
  }  catch (error: any) {
    if(error.message === 'jwt expired' || error.message === 'invalid signature'){
      return response.status(401).json({
        status: 'error',
        message: 'Session Expired. Please log in again.',
      });
    }
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error: ${error}`,
    })
  }
};