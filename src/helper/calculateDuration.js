import { differenceInSeconds } from "date-fns";

export const countdownTimer = (futureTime, currentTime) => {
  let diff = differenceInSeconds(futureTime, currentTime);
  let h = Math.floor((diff / (60 * 60)) % 24);
  let m = Math.floor((diff / 60) % 60);
  let s = Math.floor(diff % 60);

  return { diff, h, m, s };
};
