import fs from 'fs'
import xmlParser from 'xml2json'
import { aeKeyframesFileToJSON } from './ae-to-json'
import type { AEKeyframeList, AESpacialValue, AEKeyframeSpacial } from './ae-to-json'
import type { 
  Ozml,
  Scene,
  LayerScenenode,
  LayerParameter,
  LayerChildParameter, 
  BaseParameter,
  KeyframesTrack,
  Curve, 
  Time, 
  Value, 
  KeyPoint,
  Clip 
} from './types/motion-types'
import { AEKeyFrame } from './types/ae-types'
type Dimensions = { w:number, h:number }

convertAEFrontCornerToMotion()

function convertAEFrontCornerToMotion () {
  const motionTemplatePath = './templates/BOX-With-Portrait-TEMPLATE.motn'
  const aeFrontCornersKeysPath = './templates/ae-front-corners-keys.txt'
  const aeSidesCornersKeysPath = './templates/ae-sides-corners-keys.txt'
  const aeLeftSideSwitchesPath = './templates/ae-left-side-switch-keys.txt'
  const aeRightSidesSwitchesPath = './templates/ae-right-side-switch-keys.txt'
  const motionTemplateXML = fs.readFileSync(motionTemplatePath, 'utf8')
  const aeFrontCornersKeys = fs.readFileSync(aeFrontCornersKeysPath, 'utf8')
  const aeSidesCornersKeys = fs.readFileSync(aeSidesCornersKeysPath, 'utf8')
  const aeLeftSideSwitches = fs.readFileSync(aeLeftSideSwitchesPath, 'utf8')
  const aeRightSideSwitches = fs.readFileSync(aeRightSidesSwitchesPath, 'utf8')

  const FPS = 60
  const DENOMINATOR = 600000//153600

  const json = xmlParser.toJson(motionTemplateXML, {
    object: true,
    reversible: true,
    coerce: true,
    sanitize: false,
    trim: true,
    arrayNotation: false,
    alternateTextNode: false
  })
  const scene = (json.ozml as Ozml).scene as Scene
  const sceneDimensions = {
    w: scene.sceneSettings.width.$t,
    h: scene.sceneSettings.height.$t
  }

  setFourCornerForLayer('FRONT', scene, aeFrontCornersKeys, sceneDimensions, FPS, DENOMINATOR)
  setFourCornerForLayer('LEFT SIDE', scene, aeSidesCornersKeys, sceneDimensions, FPS, DENOMINATOR)
  setOpacityFromCheckboxKeysForLayer('LEFT SIDE', scene, aeLeftSideSwitches, 0.6, FPS, DENOMINATOR)
  setFourCornerForLayer('RIGHT SIDE', scene, aeSidesCornersKeys, sceneDimensions, FPS, DENOMINATOR)
  setOpacityFromCheckboxKeysForLayer('RIGHT SIDE', scene, aeRightSideSwitches, 0.9, FPS, DENOMINATOR)

  console.error('Saving...')
  const jsonString = JSON.stringify(json);
  const newXML = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE ozxmlscene>` + xmlParser.toXml(jsonString)

  fs.writeFileSync('./MOTION-projects/BOX-PORTRAITS-TEMPLATE.motn', newXML)
  fs.writeFileSync('./JSON-tests/BOX-PORTRAITS-template.json', jsonString)
  console.log('Done!')
}

function setOpacityFromCheckboxKeysForLayer (
    layerName: string, 
    scene: Scene, 
    aeSwitchKeysTxt: string,
    onValue: number,
    FPS: number, 
    DENOMINATOR: number
  ) {
  const layerProperties = getPropertiesByLayerName(layerName, scene)
  if (!layerProperties) {
    console.error('Layer Properties not found')
    return
  }
  const opacity = getLayersPropertyByPath(layerName, 'Blending/Opacity', scene) as LayerChildParameter
  if (!opacity) { 
    console.error('Opacity property not found')
    return 
  }
  const opacityCurve = curve(onValue, 1)
  const aeSwitchKeys = aeKeyframesFileToJSON(aeSwitchKeysTxt)
  const sideKeys = aeSwitchKeys.CheckboxControl.Checkbox
  const motionKeys = convertAECheckboxKeyframesToMotionKeys(sideKeys, onValue, FPS, DENOMINATOR)
  opacityCurve.keypoint = motionKeys
  opacityCurve.numberOfKeypoints = { $t: motionKeys.length }
  opacity.curve = opacityCurve
}

function setFourCornerForLayer (
    layerName: string, 
    scene: Scene, 
    aeKeysTxt: string, 
    sceneDimensions: Dimensions,
    FPS: number, 
    DENOMINATOR: number
  ) {
  const layerProperties = getPropertiesByLayerName(layerName, scene)
  if (!layerProperties) {
    console.error('Layer Properties not found')
    return
  }
  if (!layerProperties) {
    console.error('Layer Parameters not found')
    return
  }
  console.log(`Setting Four Corner for Layer ${layerName}:`)
  const fourCorner = layerProperties.parameter.find(node => node.name === 'Four Corner')
  const {w, h} = getLayersMediaDimensions(layerProperties, scene)
  const mediaDimensions = {w: w || 270, h: h || 350}
  /* DEBUG */
  console.log(`%c %c mediaDimensions: `, 'background:#ffbb00;color:#000', 'color:#00aaff', mediaDimensions)
  const aeCornersKeyframes = aeKeyframesFileToJSON(aeKeysTxt)
  const cornerOrigin = cornerOriginsOnScene(mediaDimensions, sceneDimensions)
  if (fourCorner) {
    const fourCornerParameters: BaseParameter['parameter'] = [
      corner('Bottom Left', 1),
      corner('Bottom Right', 2),
      corner('Top Right', 3),
      corner('Top Left', 4)
    ]
    fourCornerParameters.forEach((corner) => {
      console.log(corner.name)
      const keyframesTrack = (corner as BaseParameter).parameter as KeyframesTrack[]
      const xCurve = keyframesTrack.find(par => par.name === 'X')?.curve
      const yCurve = keyframesTrack.find(par => par.name === 'Y')?.curve
      if (!xCurve || !yCurve) { return }

      const aeCornerName = corner.name.replace(/\s/g, '')
      const aeKeyframes = aeCornersKeyframes.CCPowerPin[aeCornerName]
      const origin = cornerOrigin[aeCornerName]
      const { x: xKeys, y: yKeys } = convertAECornerKeyframesToMotionKeys(aeKeyframes, origin, FPS, DENOMINATOR)
      xCurve.keypoint = xKeys
      yCurve.keypoint = yKeys
      xCurve.numberOfKeypoints = { $t: xKeys.length }
      yCurve.numberOfKeypoints = { $t: yKeys.length }
    })
    fourCorner.parameter = fourCornerParameters
  }
}

function getLayerByName (name: string, scene: Scene) {
  return scene.layer.scenenode.find(node => node.name === name)
}

function getPropertiesByLayerName (layerName: string, scene: Scene) {
  const layer = getLayerByName(layerName, scene)
  if (!layer) {
    console.error(`Layer ${layerName} not found`)
    return    
  }
  return layer?.parameter.find(node => node.name === 'Properties')
}

function getLayersPropertyByPath (layerName: string, propPath: string, scene: Scene) {
  const props = getPropertiesByLayerName(layerName, scene)
  if (!props) {
    console.error(`Properties of ${layerName} not found`)
    return
  }
  const parts = propPath.split('/')
  return parts.reduce((parentProp, propName) => {
    if (!parentProp) return
    return parentProp.parameter?.find((par: BaseParameter) => par.name === propName)
  }, props as LayerParameter|LayerChildParameter|BaseParameter)
}
function convertAECheckboxKeyframesToMotionKeys (
    aeKeyframes: AEKeyframeList,
    onValue: number,
    fps: number,
    denominator: number,
  ) {
  return aeKeyframes.reduce((res, aeKeyframe, i) => {
    const time = frameToFractionalTime(aeKeyframe.frame + 5, fps, denominator)
    const value = aeKeyframe.value === 1 ? onValue : 0
    res.push(keyPoint(time, value, 0))
    return res
  }, [] as KeyPoint[])
}
function convertAECornerKeyframesToMotionKeys (
    aeKeyframes: AEKeyframeList, 
    cornerOrigin: {x:number, y:number},
    fps: number,
    denominator: number,
  ) {
  const frameShift = 5 // magical number which fixes an issue with non sync in the motion keyframes
  return aeKeyframes.reduce((res, aeKeyframe, i) => {
    // if (i !== 3460) { return res  }
    // if ((i < (3460 - 5)) || (i > (3460 + 5))) { return res  }
    const time = frameToFractionalTime(aeKeyframe.frame + 5, fps, denominator)
    const { x, y } = aeKeyframe.value as AESpacialValue
    res.x.push(keyPoint(time, x - cornerOrigin.x))
    res.y.push(keyPoint(time, cornerOrigin.y - y))
    return res
  }, { x: [], y: [] } as Record<string, KeyPoint[]>)
}

function getLayersMediaDimensions(layerParameters: LayerParameter, scene:Scene): { w:number, h:number } {
  const media = layerParameters.parameter.find((node: LayerChildParameter) => node.name === 'Media')
  const mediaId = media?.parameter.find((par:BaseParameter) => par.name === 'Source Media' && !!par.value)?.value as number
  const clip = scene.footage.clip.find((clip: Clip) => clip.id === mediaId)
  if (!clip) { return { w: 0, h: 0 } }
  const clipObject = findParamOfObject(clip.parameter, 'Object')
  if (!clipObject) { return { w: 0, h: 0 } }
  const w = findParamOfObject(clipObject.parameter as BaseParameter[], 'Fixed Width')?.value as number
  const h = findParamOfObject(clipObject.parameter as BaseParameter[], 'Fixed Height')?.value as number
  return { w, h }
}

function findParamOfObject(object: { name: string }[], parmaName: string): BaseParameter {
  return object.find(param => param.name === parmaName) as BaseParameter
}

function setCornerPositionAtFrame (
    frameN: number, 
    corner: LayerChildParameter, 
    position: { x: number, y: number }, fps: number, denominator: number
  ) {
  const cornerName = corner.name
  const xCurve = corner.parameter.find((node: LayerChildParameter) => node.name === 'X').curve as Curve
  const yCurve = corner.parameter.find((node: LayerChildParameter) => node.name === 'Y').curve as Curve

  const timeStr = frameToFractionalTime(frameN, fps, denominator)
  const { x, y } = position
  addKeyPointToCurve(xCurve, timeStr, x)
  addKeyPointToCurve(yCurve, timeStr, y)
}

function corner (name:string, id:number): BaseParameter {
  return {
    name,
    id,
    flags: 8589938704, // number taken from a Motion Project
    foldFlags: { $t: 15 }, // number taken from a Motion Project
    parameter: [
      keyframesTrack('X', 1),
      keyframesTrack('Y', 2)
    ]
  }
}

function keyframesTrack(name: string, id: number, value: number = 0, defaultValue: number = 0): KeyframesTrack {
  return {
    name,
    id,
    flags: 8606711824, // number taken from a Motion Project
    curve: curve(value, defaultValue)
  }  
}

function curve(value: number = 0, defaultValue: number = 0) {
  return {
    type: 1,
    default: defaultValue,
    value,
    numberOfKeypoints: { $t: 0 },
    keypoint: [] as KeyPoint[]
  }
}

function addKeyPointToCurve (curve: Curve, time: string, value: number) {
  curve.keypoint.push(keyPoint(time, value))
}

function keyPoint (time: string, value: number, interpolation = 1): KeyPoint {
  return { 
    time: motionTime(time),
    value: motionValue(value),
    interpolation,
    flags: 0
  }
}

function motionValue (value: number): Value {
  return { $t: value }
}
function motionTime (value: string): Time {
  return { $t: value }
}


function frameToFractionalTime(frameN: number, fps: number, denominator: number) {
  const mysteriousMotionTimeSuffix = '1 0'
  let numerator = 0
  if (frameN === 0) {
    denominator = 1
    return `${numerator} ${denominator} ${mysteriousMotionTimeSuffix}`
  }
  const seconds = frameN / fps
  const denominatorFact = denominator / fps
  numerator = Math.round(seconds * denominator)
  // denominator = fps * denominatorFact
  return `${numerator} ${denominator} ${mysteriousMotionTimeSuffix}`
}

function cornerOriginsOnScene(objectSize: Dimensions, sceneSize: Dimensions): Record<string, {x: number, y: number}> {
  const sceneCenter = { 
    x: sceneSize.w / 2,
    y: sceneSize.h / 2
  }
  const objectCenter = {
    x: objectSize.w / 2,
    y: objectSize.h / 2
  }
  return {
    TopLeft: {
      x: sceneCenter.x - objectCenter.x,
      y: sceneCenter.y - objectCenter.y
    },
    TopRight: {
      x: sceneCenter.x + objectCenter.x,
      y: sceneCenter.y - objectCenter.y
    },
    BottomRight: {
      x: sceneCenter.x + objectCenter.x,
      y: sceneCenter.y + objectCenter.y
    },
    BottomLeft: {
      x: sceneCenter.x - objectCenter.x,
      y: sceneCenter.y + objectCenter.y
    }
  }
}
