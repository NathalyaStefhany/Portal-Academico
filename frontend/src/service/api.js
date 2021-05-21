const API = 'http://localhost:3333';

export const POST_STUDENT_LOGIN = (body) => ({
  url: `${API}/login/student`,
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
