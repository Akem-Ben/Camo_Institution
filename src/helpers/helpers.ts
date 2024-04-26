import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { sendLoginDetails } from "../utilities/notification";
import { Request, Response } from "express";
import Responses, { ResponseAttributes } from "../models/studentResponseModel/studentResponse";
import Questions, { QuestionAttributes } from "../models/questionModel/questionModel";
import Enrollment, { EnrollmentAttributes } from "../models/enrollmentModel/enrollment";

dotenv.config();

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateToken = (data: any) => {
  return jwt.sign(data, `${process.env.APP_SECRET}`, {expiresIn: "1d"});
};

export const convertToDDMMYY = (isoDateString:any)=>{
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
}

export const convertToISODateString = (regularDateString: any): string | null => {
  const dateParts = regularDateString.split('/');

  if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];

      // Ensure the date is valid by constructing a Date object
      const date = new Date(`${year}-${month}-${day}`);

      // Check if the date is valid after parsing
      if (!isNaN(date.getTime())) {
          return date.toISOString().slice(0, 10);
      }
  }
  return null; // Return null for invalid or unrecognized input
};

export const sendTestMail = async () => {

  let mailingDetails = {
    email: "akemini.ndaobong@gmail.com",
    registration_number: "HBS/2021/001"
}

 await sendLoginDetails(mailingDetails)
 
 return console.log('test')

}

export const markExams = async (student_id:string, course_id:string) => {
  try {

    const getStudentsResponse: any | undefined = await Responses.findAll({where: {course_id, student_id}}) as unknown as ResponseAttributes;

    
    let check_marking = false
    
    getStudentsResponse.map((response:ResponseAttributes)=>{
      if(Number(response.response_score) !== 0){
        check_marking = true;
        return;
      }
    })
    
    if(check_marking){
      return;
    }
    
    let sum = 0;

    for(let index = 0; index < getStudentsResponse.length; index++){
      const studentAnswer = getStudentsResponse[index];
      const question = await Questions.findOne({where: {id: studentAnswer.question_id, course_id}}) as unknown as QuestionAttributes;
      if(question){
        if(studentAnswer.response_text === question.answer){
          sum += Number(question.score);
          let newScore = Number(question.score)
          await Responses.update({response_score: newScore}, {where: {id: studentAnswer.id}}) as unknown as ResponseAttributes;
      }else{
        sum += 0;
        await Responses.update({response_score: 0}, {where: {id: studentAnswer.id}}) as unknown as ResponseAttributes;
      }
    }

    await Enrollment.update({total_score: sum}, {where: {student_id, course_id}}) as unknown as EnrollmentAttributes;
  }

  const findAndConfirm = await Responses.findAll({where: {course_id, student_id}}) as unknown as ResponseAttributes;
  const findQuestion = await Questions.findAll({where: {course_id}}) as unknown as QuestionAttributes;
  return;
} catch (error: any) {
  console.log(error.message);
  return error.message;
}
}