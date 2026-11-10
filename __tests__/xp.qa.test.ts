import { calculateLevel, calculateSessionXp, levelProgress } from "@/lib/gamification/xp";
import { STREAK_BONUS_XP, XP_PER_REP } from "@/config/gamification";

describe("XP and level calculation", () => {
  test("TC-03a: 0 and 99 XP are level 1", () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(99)).toBe(1);
  });

  test("TC-03b: exactly 100 XP reaches level 2", () => {
    expect(calculateLevel(100)).toBe(2);
  });

  test("TC-03c: 101 XP is level 2", () => {
    expect(calculateLevel(101)).toBe(2);
  });

  test("TC-03d: exactly 250 XP reaches level 3", () => {
    expect(calculateLevel(250)).toBe(3);
  });

  test("TC-03e: exactly 5400 XP reaches the top level 11", () => {
    expect(calculateLevel(5400)).toBe(11);
  });

  test("TC-03f: at exactly 100 XP the profile shows level 2 with 0% progress", () => {
    const result = levelProgress(100);
    expect(result.level).toBe(2);
    expect(result.progress).toBe(0);
  });

  test("TC-03g: streak bonus applies only from day 2 onward", () => {
    expect(calculateSessionXp(10, 1)).toBe(10 * XP_PER_REP);
    expect(calculateSessionXp(10, 2)).toBe(10 * XP_PER_REP + STREAK_BONUS_XP);
  });
});
