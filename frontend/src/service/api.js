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

export const POST_TEACHER_LOGIN = (body) => ({
  url: `${API}/login/teacher`,
  config: {
    method: 'POST',
    data: body,
  },
});

export const POST_TEACHER_UPDATE_PASSWORD = (body) => ({
  url: `${API}/teacher/updatePass`,
  config: {
    method: 'POST',
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
