const API = 'http://localhost:3333';

export const POST_STUDENT_LOGIN = (body) => ({
  url: `${API}/login/student`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const POST_STUDENT_UPDATE_PASSWORD = (body) => ({
  url: `${API}/student/updatePass`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const GET_STUDENT = (matriculationNumber) => ({
  url: `${API}/student/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_HISTORIC = (matriculationNumber) => ({
  url: `${API}/historic/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_COEFFICIENT = (matriculationNumber) => ({
  url: `${API}/coefficient/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_TIME_TABLE = (matriculationNumber) => ({
  url: `${API}/student/timeTable/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_TESTS = (matriculationNumber) => ({
  url: `${API}/student/tests/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_GRADES = (matriculationNumber) => ({
  url: `${API}/student/grades/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_REPLACEMENT = (matriculationNumber) => ({
  url: `${API}/student/replacements/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_REQUIREMENTS = (matriculationNumber) => ({
  url: `${API}/subject/requirementsTable/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_OPENING_HOURS = (matriculationNumber) => ({
  url: `${API}/student/openingHours/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const GET_STUDENT_FREQUENCY = (matriculationNumber) => ({
  url: `${API}/student/frequency/${matriculationNumber}`,
  config: {
    method: 'GET',
  },
});

export const POST_TEACHER_LOGIN = (body) => ({
  url: `${API}/login/teacher`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const GET_TEACHER = (employeeNumber) => ({
  url: `${API}/teacher/${employeeNumber}`,
  config: {
    method: 'GET',
  },
});

export const POST_TEACHER_UPDATE_PASSWORD = (body) => ({
  url: `${API}/teacher/updatePass`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const GET_TEACHER_TIME_TABLE = (employeeNumber) => ({
  url: `${API}/teacher/timeTable/${employeeNumber}`,
  config: {
    method: 'GET',
  },
});

export const PUT_INSERT_GRADE = (body) => ({
  url: `${API}/student/insertGrade`,
  config: {
    method: 'PUT',
    data: body,
  },
});

export const PUT_INSERT_FREQUENCY = (body) => ({
  url: `${API}/class/insertFrequency`,
  config: {
    method: 'PUT',
    data: body,
  },
});

export const POST_EMPLOYEE_LOGIN = (body) => ({
  url: `${API}/login/admin`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const POST_EMPLOYEE_UPDATE_PASSWORD = (body) => ({
  url: `${API}/admin/updatePass`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const POST_CREATE_STUDENT = (body) => ({
  url: `${API}/student`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const POST_CREATE_TEACHER = (body) => ({
  url: `${API}/teacher`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const PUT_CREATE_TEST = (body) => ({
  url: `${API}/class/insertTest`,
  config: {
    method: 'PUT',
    data: body,
  },
});

export const POST_CREATE_REPLACEMENT = (body) => ({
  url: `${API}/replacement`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const GET_ALL_SUBJECTS = () => ({
  url: `${API}/subjects`,
  config: {
    method: 'GET',
  },
});

export const GET_CLASS = (classId) => ({
  url: `${API}/class/${classId}`,
  config: {
    method: 'GET',
  },
});
