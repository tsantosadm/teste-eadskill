import axios from 'axios';

const API_URL = 'https://trial.lmsnext.com.br/moodle/webservice/rest/server.php';
const TOKEN = '4f7f4b97a28ded4d2427deb0622cf27d';
const FUNCTION_NAME = 'core_course_get_courses';
const FORMAT = 'json';

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        wstoken: TOKEN,
        wsfunction: FUNCTION_NAME,
        moodlewsrestformat: FORMAT,
      },
    });
    console.log(response, 'DADOS')
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};
