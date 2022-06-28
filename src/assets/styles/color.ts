export const shiningColor = {
  black: '#060D03',
  white: '#FFFFFF',
  shallow: '#F2F2F2',
  yellow1: '#F2E205',
  yellow2: '#F2D857',
  yellow3: '#F2CB05'
}

export const shadow = {
  default: 'rgba(238, 217, 109, 0.41)',
}

export type ShiningColor = typeof shiningColor[keyof typeof shiningColor]

export type Shadow = typeof shadow[keyof typeof shadow]
