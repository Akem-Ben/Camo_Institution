import { Response, Request } from "express";
import { v4 } from "uuid";
import Institution, {
  InstitutionAttributes,
} from "../../models/institutionModel/institutionModel";

export const createInstitution = async (
    request: Request,
  response: Response
) => {
  try {

    const { institution_name } = request.body;

    const checkSchool = await Institution.findOne({
      where: { institution_name },
    });

    if (checkSchool) {
      return response.status(400).json({
        status: `error`,
        message: `Institution already exists`,
      });
    }

    const createdSchool = (await Institution.create({
      id: v4(),
      institution_name,
    })) as unknown as InstitutionAttributes;

    const findSchool = await Institution.findOne({
      where: { institution_name, id: createdSchool.id },
    });

    if (findSchool) {
      return response.status(200).json({
        status: `success`,
        message: `Institution created successfully`,
        findSchool,
      });
    }

    return response.status(400).json({
      status: `error`,
      message: `Unable to create Institution, try again`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error, contact admin please`,
    });
  }
};
