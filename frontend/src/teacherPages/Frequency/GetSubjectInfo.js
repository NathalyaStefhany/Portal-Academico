import { GET_CLASS } from '../../service/api';

const GetSubjectInfo = async (id, request) => {
  const { url: url, config: config } = GET_CLASS(id);

  const { json, error } = await request(url, config);

  let classParam = '';
  let subject = '';

  if (!error && json) {
    classParam = json.classParam ? ` - ${json.classParam}` : '';
    subject = json.acronym + classParam;
  }

  return {
    subject: subject,
    students: json.students,
    frequency: json.frequency,
    id: id,
  };
};

export default GetSubjectInfo;
