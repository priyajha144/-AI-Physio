import { evaluateStreak } from "@/lib/gamification/streak";

const TODAY = "2026-10-28";

describe("Streak evaluation", () => {
  test("TC-04a: a second session on the same day leaves the streak unchanged", () => {
    const result = evaluateStreak(TODAY, 3, 5, TODAY);
    expect(result.newStreak).toBe(3);
    expect(result.isNewStreakDay).toBe(false);
    expect(result.newLongestStreak).toBe(5);
  });

  test("TC-04b: a same-day session never pushes the longest streak up", () => {
    const result = evaluateStreak(TODAY, 5, 5, TODAY);
    expect(result.newStreak).toBe(5);
    expect(result.newLongestStreak).toBe(5);
  });

  test("TC-05a: a session the day after the last one extends the streak", () => {
    const result = evaluateStreak("2026-10-27", 3, 5, TODAY);
    expect(result.newStreak).toBe(4);
    expect(result.isNewStreakDay).toBe(true);
  });

  test("TC-05b: the longest streak updates only when exceeded", () => {
    const result = evaluateStreak("2026-10-27", 5, 5, TODAY);
    expect(result.newStreak).toBe(6);
    expect(result.newLongestStreak).toBe(6);
  });

  test("TC-05c: a gap of two or more days resets the streak to 1", () => {
    const result = evaluateStreak("2026-10-26", 9, 9, TODAY);
    expect(result.newStreak).toBe(1);
    expect(result.newLongestStreak).toBe(9);
  });

  test("TC-05d: the first ever session starts a streak of 1", () => {
    const result = evaluateStreak(null, 0, 0, TODAY);
    expect(result.newStreak).toBe(1);
    expect(result.isNewStreakDay).toBe(true);
  });
});
