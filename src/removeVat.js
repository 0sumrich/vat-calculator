export default function removeVat(input, vat) {
  const num = Number(input),
        ratio = 1 + vat / 100;
  return (num / ratio).toFixed(2).toString();
}

