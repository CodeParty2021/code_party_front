export const INITIAL_CODE = `
# ロボットの名前
def select(turn, field, me, others):
  return 4
`;

export const EVENT1ON1_INIT_CODE = `
#ロボットの名前
"""
 ロボットは4番の位置にいて、次のターンそれぞれの番号のところにいどうするよ！
     0
     ↑
 3 ← 4 → 1
     ↓
     2

 0 => 上にすすむよ!
 1 => 右にすすむよ!
 2 => 下にすすむよ!
 3 => 左にすすむよ!
 4 => そのまま止まるよ！
"""

def select(turn, field, me, others):
  meirei = {
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    13: 4,
    14: 4,
    15: 4,
    16: 4,
    17: 4,
    18: 4,
    19: 4,
    20: 4,
    21: 4,
    22: 4,
    23: 4,
    24: 4,
    25: 4,
    26: 4,
    27: 4,
    28: 4,
    29: 4,
    30: 4,
  }
  return meirei[turn]
`;
