export default function numParse(int, dec) {
  const integer = int.length == 1 ? 0 : int.substring(1);
  return integer + "." + dec.substring(dec.length - 2);
};