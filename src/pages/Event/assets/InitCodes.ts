export const EVENT1ON1_INIT_CODE = `
# 0=>上にすすむ、1=>右にすすむ、2=>下にすすむ、3=>左に進む、4=>そのままとまる
def select(turn_num, field, my_pos, other_pos):
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
  return meirei[turn_num]
`;
