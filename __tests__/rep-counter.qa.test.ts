import { RepCounterFSM } from "@/lib/fsm/rep-counter";

const BICEP_CURL = { minAngle: 160, maxAngle: 45, tolerance: 8, peakHoldMs: 300 };

type Frame = [number, number]; // [angle in degrees, timestamp in ms]

function countReps(frames: Frame[]): number {
  const fsm = new RepCounterFSM(BICEP_CURL);
  for (const [angle, timestampMs] of frames) {
    fsm.update(angle, [], timestampMs);
  }
  return fsm.getReps();
}

describe("Rep counter FSM (bicep curl thresholds)", () => {
  test("TC-01: wobbling near the peak before returning counts exactly one rep", () => {
    const frames: Frame[] = [
      [160, 0], [120, 200], [70, 400], [70, 550],
      [100, 700], [75, 850], [70, 1000], [70, 1150],
      [100, 1250], [75, 1400], [70, 1550], [70, 1700],
      [100, 1850],
      [160, 2000], [160, 2150],
    ];
    expect(countReps(frames)).toBe(1);
  });

  test("TC-02: one clean slow curl counts exactly one rep", () => {
    const frames: Frame[] = [
      [160, 0], [120, 200], [70, 400], [70, 550], [70, 700],
      [120, 850], [160, 1000], [160, 1150],
    ];
    expect(countReps(frames)).toBe(1);
  });

  test("TC-06: a curl abandoned before returning to the start position counts zero reps", () => {
    const frames: Frame[] = [
      [160, 0], [120, 200], [70, 400], [70, 550],
      [100, 700], [100, 850], [100, 1000], [100, 1150],
    ];
    expect(countReps(frames)).toBe(0);
  });
});
