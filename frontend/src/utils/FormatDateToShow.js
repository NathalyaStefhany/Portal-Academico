export default function (date) {
  return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
}
