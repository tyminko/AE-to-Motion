export type AESpacialValue = { x: number; y: number };
export type EffectName = string
export type PropertyName = string
export type Keyframe = { frame: number; value: AESpacialValue | number }
export type AEKeyframeSpacial = { frame: number; value: number }
export type AEKeyframeList = Keyframe[];
export type AEKeyframes = Record<EffectName, Record<PropertyName, AEKeyframeList>>

export function aeKeyframesFileToJSON (data:string):AEKeyframes {
  const lines = data.split('\n')

  const keyframes: AEKeyframes = {}
  let currentEffect = ''
  let currentProperty = ''

  for (const line of lines) {
    const parts = line.trim().split(/\t+/)
    if (parts.length < 1) { continue }
    if (parts[0].startsWith('Adobe')) { continue }
    if (parts[0].startsWith('Effects')) {
      const reg = /(\s#\d+)|(\s)/g
      currentEffect = parts[1]?.replace(reg, '')
      currentProperty = parts[2]?.replace(reg, '')
      if (!keyframes[currentEffect]) { 
        keyframes[currentEffect] = {} 
      }
      if (!keyframes[currentEffect][currentProperty]) { 
        keyframes[currentEffect][currentProperty] = [] 
      }
      continue
    }
    const [maybeFrame, ...maybeValue] = parts
    const frame = parseInt(maybeFrame)
    if (isNaN(frame)) { continue }
    const value = maybeValueToPropertyValue(maybeValue)
    if (value !== null) {
      keyframes[currentEffect][currentProperty].push({ frame, value })
    }
  }
  return keyframes
}

const effectKeyValueLength = (effectName:string) => {
  switch (effectName) {
    case 'CC Power Pin': return 3
    case 'Checkbox Control': return 2
    default: return 0
  }
}
/**
 * @param {*[]} maybeValue 
 * @returns 
 */
function maybeValueToPropertyValue (maybeValue: string[]) {
  switch (maybeValue.length) {
    case 0: return null
    case 1: return parseFloat(maybeValue[0])
    case 2: return { x: parseFloat(maybeValue[0]), y: parseFloat(maybeValue[1]) }
  }
  return null
}
