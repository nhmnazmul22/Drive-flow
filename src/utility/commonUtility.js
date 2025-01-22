// ========= Generate Average Rating =========
export const AverageRating = (ratingObj) => {
  let rating = 0;
  let avgRating = 0;

  for (let [key, value] of Object.entries(ratingObj)) {
    rating += value;
  }

  avgRating = rating / Object.keys(ratingObj).length;
  avgRating.toPrecision(2);

  return Number(avgRating);
};
