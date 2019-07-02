export function is_date_valid(d) {
  return d instanceof Date && !isNaN(d);
}

export function are_equal(d1, d2) {
  if (typeof d1 === "string") d1 = new Date(d1);
  if (typeof d2 === "string") d2 = new Date(d2);

  if (is_date_valid(d1) === false) return false;
  if (is_date_valid(d2) === false) return false;

  return d1.getTime() == d2.getTime();
}

export default { is_date_valid, are_equal };
