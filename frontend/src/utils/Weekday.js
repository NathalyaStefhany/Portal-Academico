export default function (date) {
  if (
    date.toLowerCase() === 'segunda-feira' ||
    date.toLowerCase() === 'segunda'
  )
    return 'monday';
  else if (
    date.toLowerCase() === 'terça-feira' ||
    date.toLowerCase() === 'terça'
  )
    return 'tuesday';
  else if (
    date.toLowerCase() === 'quarta-feira' ||
    date.toLowerCase() === 'quarta'
  )
    return 'wednesday';
  else if (
    date.toLowerCase() === 'quinta-feira' ||
    date.toLowerCase() === 'quinta'
  )
    return 'thursday';
  else if (
    date.toLowerCase() === 'sexta-feira' ||
    date.toLowerCase() === 'sexta'
  )
    return 'friday';
  else return 'saturday';
}
