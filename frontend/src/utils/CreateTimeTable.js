import Weekday from './Weekday';

export default function (data, user) {
  const timeTable = [
    {
      hour: '08:00 - 08:50',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '08:50 - 09:40',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '10:00 - 10:50',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '10:50 - 11:40',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '13:30 - 14:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '14:20 - 15:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '15:30 - 16:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '16:20 - 17:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '17:30 - 18:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '18:20 - 19:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '19:30 - 20:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '20:20 - 21:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '21:30 - 22:20',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
    {
      hour: '22:10 - 23:10',
      monday: { acronyme: null, classroom: null },
      tuesday: { acronyme: null, classroom: null },
      wednesday: { acronyme: null, classroom: null },
      thursday: { acronyme: null, classroom: null },
      friday: { acronyme: null, classroom: null },
      saturday: { acronyme: null, classroom: null },
    },
  ];

  for (let i = 0; i < data.length; i++) {
    if (user === 'teacher')
      for (let j = 0; j < data[i].Date.length; j++) {
        const date = data[i].Date[j];
        const weekday = Weekday(date.Weekday);
        const acronyme = data[i].Acronym;
        const classParam = data[i].Class ? ` - ${data[i].Class}` : '';
        const classroom =
          data[i].Classroom !== 'Atendimento'
            ? `(Local: ${data[i].Classroom})`
            : '(Atendimento)';

        if (date.Time === '08:00') {
          timeTable[0][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[0][weekday].classroom = classroom;
        } else if (date.Time === '08:50') {
          timeTable[1][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[1][weekday].classroom = classroom;
        } else if (date.Time === '10:00') {
          timeTable[2][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[2][weekday].classroom = classroom;
        } else if (date.Time === '10:50') {
          timeTable[3][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[3][weekday].classroom = classroom;
        } else if (date.Time === '13:30') {
          timeTable[4][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[4][weekday].classroom = classroom;
        } else if (date.Time === '14:20') {
          timeTable[5][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[5][weekday].classroom = classroom;
        } else if (date.Time === '15:30') {
          timeTable[6][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[6][weekday].classroom = classroom;
        } else if (date.Time === '16:20') {
          timeTable[7][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[7][weekday].classroom = classroom;
        } else if (date.Time === '17:30') {
          timeTable[8][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[8][weekday].classroom = classroom;
        } else if (date.Time === '18:20') {
          timeTable[9][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[9][weekday].classroom = classroom;
        } else if (date.Time === '19:30') {
          timeTable[10][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[10][weekday].classroom = classroom;
        } else if (date.Time === '20:20') {
          timeTable[11][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[11][weekday].classroom = classroom;
        } else if (date.Time === '21:30') {
          timeTable[12][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[12][weekday].classroom = classroom;
        } else {
          timeTable[13][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[13][weekday].classroom = classroom;
        }
      }
    else {
      for (let j = 0; j < data[i].ClassDates.length; j++) {
        const date = data[i].ClassDates[j];
        const weekday = Weekday(date.Weekday);
        const acronyme = data[i].Acronym;
        const classParam = data[i].Class ? ` - ${data[i].Class}` : '';
        const classroom = data[i].Classroom
          ? `(Local: ${data[i].Classroom})`
          : null;

        if (date.Time === '08:00') {
          timeTable[0][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[0][weekday].classroom = classroom;
        } else if (date.Time === '08:50') {
          timeTable[1][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[1][weekday].classroom = classroom;
        } else if (date.Time === '10:00') {
          timeTable[2][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[2][weekday].classroom = classroom;
        } else if (date.Time === '10:50') {
          timeTable[3][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[3][weekday].classroom = classroom;
        } else if (date.Time === '13:30') {
          timeTable[4][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[4][weekday].classroom = classroom;
        } else if (date.Time === '14:20') {
          timeTable[5][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[5][weekday].classroom = classroom;
        } else if (date.Time === '15:30') {
          timeTable[6][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[6][weekday].classroom = classroom;
        } else if (date.Time === '16:20') {
          timeTable[7][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[7][weekday].classroom = classroom;
        } else if (date.Time === '17:30') {
          timeTable[8][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[8][weekday].classroom = classroom;
        } else if (date.Time === '18:20') {
          timeTable[9][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[9][weekday].classroom = classroom;
        } else if (date.Time === '19:30') {
          timeTable[10][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[10][weekday].classroom = classroom;
        } else if (date.Time === '20:20') {
          timeTable[11][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[11][weekday].classroom = classroom;
        } else if (date.Time === '21:30') {
          timeTable[12][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[12][weekday].classroom = classroom;
        } else {
          timeTable[13][weekday].acronyme = `${acronyme}${classParam}`;
          timeTable[13][weekday].classroom = classroom;
        }
      }
    }
  }

  return timeTable;
}
