import { GET_TEACHER } from '../../service/api';
import GetSubjectInfo from './GetSubjectInfo';

const GetSubjects = async (employeeNumber, request, setAllSubjects) => {
  const { url: url, config: config } = GET_TEACHER(employeeNumber);

  const { json, error } = await request(url, config);

  if (!error) {
    const classesId = json?.Classes;

    setAllSubjects(
      await Promise.all(classesId?.map((id) => GetSubjectInfo(id, request)))
    );
  }
};

export default GetSubjects;
