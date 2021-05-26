export default function (date) {
  return `${date.substr(6, 4)}-${date.substr(3, 2)}-${date.substr(0, 2)}`;
}
