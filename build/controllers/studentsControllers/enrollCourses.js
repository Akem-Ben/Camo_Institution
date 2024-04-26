"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCourses = void 0;
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const enrollment_1 = __importDefault(require("../../models/enrollmentModel/enrollment"));
const enrollCourses = async (request, response) => {
    try {
        let { courses } = request.body;
        courses = JSON.parse(courses);
        const studentId = request.user.id;
        const studentExist = await userModel_1.default.findOne({ where: { id: studentId } });
        if (!studentExist) {
            return response.status(400).json({
                status: `error`,
                message: `Student does not exist`,
            });
        }
        if (!courses) {
            return response.status(400).json({
                status: `error`,
                message: `No course selected`,
            });
        }
        let counter = courses
            .filter((course) => Number(course.credit_unit))
            .reduce((accumulator, current) => accumulator + current, 0);
        if (counter > 30) {
            return response.status(400).json({
                status: `error`,
                message: `Maximum credit units exceeded`,
            });
        }
        let checkEnrollment = [];
        await Promise.all(courses.map(async (course) => {
            const enrollment = (await enrollment_1.default.findOne({
                where: {
                    student_id: studentId,
                    course_id: course.id,
                    course_code: course.course_code,
                    course_title: course.title,
                    department_id: course.department_id,
                },
            }));
            if (enrollment !== null) {
                checkEnrollment.push(enrollment.course_code);
            }
        }));
        if (checkEnrollment.length > 0) {
            return response.status(406).json({
                status: `error`,
                message: `Already enrolled in the following courses`,
                checkEnrollment
            });
        }
        let enrolledCoursesArray = [];
        for (let index = 0; index < courses.length; index++) {
            const newCourse = (await enrollment_1.default.create({
                id: (0, uuid_1.v4)(),
                student_id: studentId,
                course_id: courses[index].id,
                course_code: courses[index].course_code,
                course_title: courses[index].title,
                lecturer_id: courses[index].lecturer_id,
                department_id: courses[index].department_id,
                session: courses[index].session,
                semester: courses[index].semester,
                total_score: 0,
                isExamWritten: false,
            }));
            enrolledCoursesArray.push(newCourse);
        }
        if (enrolledCoursesArray.length > 0) {
            return response.status(200).json({
                status: `success`,
                message: `courses successfully enrolled.`,
                enrolledCoursesArray,
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Enrollment failed, Contact Students Affairs Division`,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, Contact Students Affairs Division please`,
        });
    }
};
exports.enrollCourses = enrollCourses;
