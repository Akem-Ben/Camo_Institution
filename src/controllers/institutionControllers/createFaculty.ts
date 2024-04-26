import { Response, Request } from "express";
import Institution from "../../models/institutionModel/institutionModel";
import Faculty, {
  FacultyAttributes,
} from "../../models/facultyModel/facultyModel";
import { v4 } from "uuid";

export const createFaculty = async (request: Request, response: Response) => {
  try {
    const { institution_name, faculty_name } = request.body;

    const checkSchool = await Institution.findOne({
      where: { institution_name },
    });

    if (!checkSchool) {
      return response.status(400).json({
        status: `error`,
        message: `Institution does not exist`,
      });
    }

    const checkFaculty = await Faculty.findOne({
      where: { institution_name, faculty_name },
    });

    if (checkFaculty) {
      return response.status(400).json({
        status: `error`,
        message: `Faculty already exists`,
      });
    }

    const createdFaculty = (await Faculty.create({
      id: v4(),
      institution_name,
      faculty_name,
    })) as unknown as FacultyAttributes;

    const findFaculty = (await Faculty.findOne({
      where: { institution_name, id: createdFaculty.id, faculty_name },
    })) as unknown as FacultyAttributes;

    if (findFaculty) {
      return response.status(200).json({
        status: `success`,
        message: `Faculty created successfully`,
        findFaculty,
      });
    }

    return response.status(400).json({
      status: `error`,
      message: `Unable to create Faculty, try again`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
