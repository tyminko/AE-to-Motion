export interface BaseFields {
    name: string
    id: number
    flags: number | { "$t": number }
}
export interface BaseParameter extends BaseFields {
    foldFlags: FoldFlags
    parameter: (BaseParameter|KeyframesTrack)[]
    value?: number|string
    default?: number|string
    $t?: string
}
export interface Layer extends BaseFields {
    scenenode: LayerScenenode[]
    aspectRatio: AspectRatio2
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags5
    parameter: BaseParameter[]
}

export interface LayerScenenode extends BaseFields {
    factoryID: number
    version: number
    validTracks: ValidTracks
    aspectRatio: AspectRatio
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags
    parameter: LayerParameter[]
    linkedobjects?: Linkedobjects
    filter?: Filter
}
export interface LayerParameter {
    name: string
    id: string
    flags: string
    $t: string
    parameter: LayerChildParameter[]
}

export interface LayerChildParameter {
    name: string
    id: string
    flags: string
    $t?: string
    FoldFlags?: FoldFlags
    parameter: any
    default?: string
    value?: string
    curve?: Curve
}

export interface ForCornersCornerParameter extends BaseFields {
    curve: Curve
}

export interface KeyframesTrack {
    name: string
    id: number
    flags: number
    curve?: Curve
}
export interface Curve {
    type: number
    default?: number
    value?: number
    numberOfKeypoints: { $t: number }
    keypoint: KeyPoint[]
    round?: string
}

export interface KeyPoint {
    time: Time
    value: Value
    flags: number
    interpolation?: number
    inputTangentTime?: InputTangentTime
    inputTangentValue?: InputTangentValue
    outputTangentTime?: OutputTangentTime
    outputTangentValue?: OutputTangentValue
}

export interface Project {
    ozml: Ozml
}

export interface Ozml {
    version: string
    displayversion: Displayversion
    factory: Factory[]
    build: Build
    description: Description2
    canvas: Canvas
    viewer: Viewer
    projectPanel: ProjectPanel
    timeline: Timeline
    curveeditor: Curveeditor
    inspector: Inspector
    scene: Scene
}

export interface Displayversion {
    $t: string
}

export interface Factory {
    id: string
    uuid: string
    description: Description
    manufacturer: Manufacturer
    version: Version
}

export interface Description {
    $t: string
}

export interface Manufacturer {
    $t: string
}

export interface Version {
    $t: string
}

export interface Build { }

export interface Description2 { }

export interface Canvas {
    layout: Layout
    activeView: ActiveView
}

export interface Layout {
    $t: string
}

export interface ActiveView {
    $t: string
}

export interface Viewer {
    subview: string
    resolutionMode: ResolutionMode
    dynamicResolution: DynamicResolution
    viewmode: Viewmode
    overlayOptions: OverlayOptions
    oscOptions: OscOptions
    compensateAspectRatio: CompensateAspectRatio
    renderFields: RenderFields
    showMotionBlur: ShowMotionBlur
    showFrameBlending: ShowFrameBlending
    showLighting: ShowLighting
    showShadows: ShowShadows
    showReflection: ShowReflection
    showDepthOfField: ShowDepthOfField
    renderFullView: RenderFullView
    renderQuality: RenderQuality
    textRenderQuality: TextRenderQuality
    showHighQualityResampling: ShowHighQualityResampling
    showShapeAntialiasing: ShowShapeAntialiasing
    show3DIntersectionAntialiasing: Show3DintersectionAntialiasing
    cameraType: CameraType
    cameraName: CameraName
    mirrorHMD: MirrorHmd
    panZoom: PanZoom
}

export interface ResolutionMode {
    $t: string
}

export interface DynamicResolution {
    $t: string
}

export interface Viewmode {
    $t: string
}

export interface OverlayOptions {
    $t: string
}

export interface OscOptions {
    $t: string
}

export interface CompensateAspectRatio {
    $t: string
}

export interface RenderFields {
    $t: string
}

export interface ShowMotionBlur {
    $t: string
}

export interface ShowFrameBlending {
    $t: string
}

export interface ShowLighting {
    $t: string
}

export interface ShowShadows {
    $t: string
}

export interface ShowReflection {
    $t: string
}

export interface ShowDepthOfField {
    $t: string
}

export interface RenderFullView {
    $t: string
}

export interface RenderQuality {
    $t: string
}

export interface TextRenderQuality {
    $t: string
}

export interface ShowHighQualityResampling {
    $t: string
}

export interface ShowShapeAntialiasing {
    $t: string
}

export interface Show3DintersectionAntialiasing {
    $t: string
}

export interface CameraType {
    $t: string
}

export interface CameraName {
    $t: string
}

export interface MirrorHmd {
    $t: string
}

export interface PanZoom {
    camera: string
    zoom: string
    panX: string
    panY: string
    mode: string
    centered: string
}

export interface ProjectPanel {
    layersPreviewColumn: LayersPreviewColumn
    layersOpacityColumn: LayersOpacityColumn
    layersBlendColumn: LayersBlendColumn
    displayMasks: DisplayMasks
    displayBehaviors: DisplayBehaviors
    displayEffects: DisplayEffects
    layersVerticalZoom: LayersVerticalZoom
    mediaPreviewColumn: MediaPreviewColumn
    mediaTypeColumn: MediaTypeColumn
    mediaDurationColumn: MediaDurationColumn
    mediaInUseColumn: MediaInUseColumn
    mediaFrameSizeColumn: MediaFrameSizeColumn
    mediaCompressorColumn: MediaCompressorColumn
    mediaDepthColumn: MediaDepthColumn
    mediaFrameRateColumn: MediaFrameRateColumn
    mediaDataRateColumn: MediaDataRateColumn
    mediaAudioRateColumn: MediaAudioRateColumn
    mediaAudioFormatColumn: MediaAudioFormatColumn
    mediaFileSizeColumn: MediaFileSizeColumn
    mediaFileCreatedColumn: MediaFileCreatedColumn
    mediaDileModifiedColumn: MediaDileModifiedColumn
    mediaVerticalZoom: MediaVerticalZoom
}

export interface LayersPreviewColumn {
    $t: string
}

export interface LayersOpacityColumn {
    $t: string
}

export interface LayersBlendColumn {
    $t: string
}

export interface DisplayMasks {
    $t: string
}

export interface DisplayBehaviors {
    $t: string
}

export interface DisplayEffects {
    $t: string
}

export interface LayersVerticalZoom {
    $t: string
}

export interface MediaPreviewColumn {
    $t: string
}

export interface MediaTypeColumn {
    $t: string
}

export interface MediaDurationColumn {
    $t: string
}

export interface MediaInUseColumn {
    $t: string
}

export interface MediaFrameSizeColumn {
    $t: string
}

export interface MediaCompressorColumn {
    $t: string
}

export interface MediaDepthColumn {
    $t: string
}

export interface MediaFrameRateColumn {
    $t: string
}

export interface MediaDataRateColumn {
    $t: string
}

export interface MediaAudioRateColumn {
    $t: string
}

export interface MediaAudioFormatColumn {
    $t: string
}

export interface MediaFileSizeColumn {
    $t: string
}

export interface MediaFileCreatedColumn {
    $t: string
}

export interface MediaDileModifiedColumn {
    $t: string
}

export interface MediaVerticalZoom {
    $t: string
}

export interface Timeline {
    displayVideo: DisplayVideo
    displayAudio: DisplayAudio
    displayKeyframes: DisplayKeyframes
    displayMasks: DisplayMasks2
    displayBehaviors: DisplayBehaviors2
    displayEffects: DisplayEffects2
    videoVerticalZoom: VideoVerticalZoom
    audioVerticalZoom: AudioVerticalZoom
    displayRange: DisplayRange
}

export interface DisplayVideo {
    $t: string
}

export interface DisplayAudio {
    $t: string
}

export interface DisplayKeyframes {
    $t: string
}

export interface DisplayMasks2 {
    $t: string
}

export interface DisplayBehaviors2 {
    $t: string
}

export interface DisplayEffects2 {
    $t: string
}

export interface VideoVerticalZoom {
    $t: string
}

export interface AudioVerticalZoom {
    $t: string
}

export interface DisplayRange {
    in: string
    out: string
}

export interface Curveeditor {
    autozoom: Autozoom
    snapping: Snapping
    displayAudioWaveform: DisplayAudioWaveform
    lockKeyframesInTime: LockKeyframesInTime
    displayRange: DisplayRange2
    currentviewvolume: Currentviewvolume
    snapshotChannels: SnapshotChannels
}

export interface Autozoom {
    $t: string
}

export interface Snapping {
    $t: string
}

export interface DisplayAudioWaveform {
    $t: string
}

export interface LockKeyframesInTime {
    $t: string
}

export interface DisplayRange2 {
    in: string
    out: string
}

export interface Currentviewvolume {
    originx: string
    originy: string
    width: string
    height: string
}

export interface SnapshotChannels {
    $t: string
}

export interface Inspector {
    collapseState: CollapseState[]
}

export interface CollapseState {
    id: string
    state: string
}

export interface Scene {
    sceneSettings: SceneSettings
    publishSettings: PublishSettings
    currentFrame: CurrentFrame
    currentObject: CurrentObject
    activeLayer: ActiveLayer
    timeRange: TimeRange
    playRange: PlayRange
    flags: Flags
    audioTracks: AudioTracks
    timemarkerset: Timemarkerset
    guideset: Guideset
    curvesets: Curvesets
    scenenode: Scenenode[]
    layer: Layer
    audio: Audio
    footage: Footage
}

export interface SceneSettings {
    width: Width
    height: Height
    duration: Duration
    shouldOverrideFCDuration: ShouldOverrideFcduration
    frameRate: FrameRate
    NTSC: Ntsc
    pixelAspectRatio: PixelAspectRatio
    workingGamut: WorkingGamut
    viewGamut: ViewGamut
    optimizeForDisplay: OptimizeForDisplay
    backgroundColor: BackgroundColor
    audioChannels: AudioChannels
    audioBitsPerSample: AudioBitsPerSample
    fieldRenderingMode: FieldRenderingMode
    motionBlurSamples: MotionBlurSamples
    motionBlurDuration: MotionBlurDuration
    sharpScaling: SharpScaling
    startTimecode: StartTimecode
    presetPath: PresetPath
    backgroundMode: BackgroundMode
    reflectionRecursionLimit: ReflectionRecursionLimit
    glyphOSCMode: GlyphOscmode
    animateFlag: AnimateFlag
    parameterColorSpaceID: ParameterColorSpaceId
    savePreviewMovie: SavePreviewMovie
    Object3DEnvironments: Object3Denvironments
    DRTSupport: Drtsupport
    onHDRDisplay: OnHdrdisplay
}

export interface Width {
    $t: number
}

export interface Height {
    $t: number
}

export interface Duration {
    $t: string
}

export interface ShouldOverrideFcduration {
    $t: string
}

export interface FrameRate {
    $t: string
}

export interface Ntsc {
    $t: string
}

export interface PixelAspectRatio {
    $t: string
}

export interface WorkingGamut {
    $t: string
}

export interface ViewGamut {
    $t: string
}

export interface OptimizeForDisplay {
    $t: string
}

export interface BackgroundColor {
    red: string
    green: string
    blue: string
    alpha: string
}

export interface AudioChannels {
    $t: string
}

export interface AudioBitsPerSample {
    $t: string
}

export interface FieldRenderingMode {
    $t: string
}

export interface MotionBlurSamples {
    $t: string
}

export interface MotionBlurDuration {
    $t: string
}

export interface SharpScaling {
    $t: string
}

export interface StartTimecode {
    $t: string
}

export interface PresetPath { }

export interface BackgroundMode {
    $t: string
}

export interface ReflectionRecursionLimit {
    $t: string
}

export interface GlyphOscmode {
    $t: string
}

export interface AnimateFlag {
    $t: string
}

export interface ParameterColorSpaceId {
    $t: string
}

export interface SavePreviewMovie {
    $t: string
}

export interface Object3Denvironments {
    $t: string
}

export interface Drtsupport {
    $t: string
}

export interface OnHdrdisplay {
    $t: string
}

export interface PublishSettings {
    version: Version2
}

export interface Version2 {
    $t: string
}

export interface CurrentFrame {
    $t: string
}

export interface CurrentObject {
    $t: string
}

export interface ActiveLayer {
    $t: string
}

export interface TimeRange {
    offset: string
    duration: string
}

export interface PlayRange {
    offset: string
    duration: string
}

export interface Flags {
    $t: string
}

export interface AudioTracks {
    $t: string
}

export interface Timemarkerset { }

export interface Guideset { }

export interface Curvesets {
    selected: string
}

export interface Scenenode {
    name: string
    id: string
    factoryID: string
    version: string
    scenenode?: Scenenode2
    flags: Flags3
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags2
    parameter: Parameter3[]
}

export interface Scenenode2 {
    name: string
    id: string
    factoryID: string
    version: string
    flags: Flags2
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags
    parameter: Parameter[]
}

export interface Flags2 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: number
}

export interface BaseFlags {
    $t: string
}

export interface Parameter {
    name: string
    id: string
    flags: string
    $t?: string
    parameter?: Parameter2[]
}

export interface Parameter2 {
    name: string
    id: string
    flags: string
    default?: string
    value?: string
}

export interface Flags3 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags2 {
    $t: string
}

export interface Parameter3 {
    name: string
    id: string
    flags: string
}



export interface ValidTracks {
    $t: number
}

export interface AspectRatio {
    $t: number
}

export interface Flags4 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags3 {
    $t: string
}

export interface FoldFlags {
    $t: string
}


export interface NumberOfKeypoints {
    $t: string
}

export interface Time {
    $t: string
}

export interface Value {
    $t: number
}

export interface InputTangentTime {
    $t: string
}

export interface InputTangentValue {
    $t: string
}

export interface OutputTangentTime {
    $t: string
}

export interface OutputTangentValue {
    $t: string
}

export interface Linkedobjects {
    $t: string
}

export interface Filter {
    name: string
    id: string
    factoryID: string
    pluginUUID: string
    pluginVersion: string
    pluginName: string
    pluginDynamicParams: string
    timing: Timing
    baseFlags: BaseFlags4
    parameter: Parameter6[]
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface BaseFlags4 {
    $t: string
}

export interface Parameter6 {
    name: string
    id: string
    flags: string
    default: string
    value: string
}

export interface AspectRatio2 {
    $t: string
}

export interface Flags5 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags5 {
    $t: string
}

export interface Parameter7 {
    name: string
    id: string
    flags: string
    $t: string
    parameter: Parameter8[]
}

export interface Parameter8 {
    name: string
    id: string
    flags: string
    FoldFlags?: FoldFlags
    $t?: string
    parameter?: Parameter9[]
    default?: string
    value?: string
}

export interface FoldFlags {
    $t: string
}

export interface Parameter9 {
    name: string
    id: string
    flags: string
    default: string
    value: string
}

export interface Audio {
    name: string
    id: string
    audioTrack: AudioTrack
    scenenode: Scenenode4
    flags: Flags8
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags8
    parameter: Parameter13[]
}

export interface AudioTrack {
    name: string
    id: string
    flags: Flags6
    linkedobjects: Linkedobjects2
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags6
    parameter: Parameter10[]
}

export interface Flags6 {
    $t: string
}

export interface Linkedobjects2 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags6 {
    $t: string
}

export interface Parameter10 {
    name: string
    id: string
    flags: string
    parameter?: Parameter11[]
}

export interface Parameter11 {
    name: string
    id: string
    flags: string
    default?: string
    value?: string
    curve?: Curve2
}

export interface Curve2 {
    type: string
    default: string
    value: string
    numberOfKeypoints: NumberOfKeypoints2
    keypoint: Keypoint2[]
    round?: string
    retimingExtrapolation?: string
}

export interface NumberOfKeypoints2 {
    $t: string
}

export interface Keypoint2 {
    interpolation: string
    flags: string
    time: Time2
    value: Value2
}

export interface Time2 {
    $t: string
}

export interface Value2 {
    $t: string
}

export interface Scenenode4 {
    name: string
    id: string
    factoryID: string
    version: string
    flags: Flags7
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags7
    parameter: Parameter12[]
}

export interface Flags7 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags7 {
    $t: string
}

export interface Parameter12 {
    name: string
    id: string
    flags: string
}

export interface Flags8 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags8 {
    $t: string
}

export interface Parameter13 {
    name: string
    id: string
    flags: string
}

export interface Footage {
    name: string
    id: string
    clip: Clip[]
    flags: Flags10
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags10
    parameter: Parameter17[]
}

export interface Clip extends BaseFields {
    pathURL: PathUrl
    relativeURL: RelativeUrl
    missingWidth: MissingWidth
    missingHeight: MissingHeight
    missingDuration: MissingDuration
    missingDynamicRangeType: MissingDynamicRangeType
    creationDuration: CreationDuration
    mediaID: MediaId
    timing: Timing
    FoldFlags: FoldFlags
    baseFlags: BaseFlags9
    parameter: BaseParameter[]
}

export interface PathUrl {
    $t: string
}

export interface RelativeUrl {
    $t: string
}

export interface MissingWidth {
    $t: string
}

export interface MissingHeight {
    $t: string
}

export interface MissingDuration {
    $t: string
}

export interface MissingDynamicRangeType {
    $t: string
}

export interface CreationDuration {
    $t: string
}

export interface MediaId { }

export interface Flags9 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags9 {
    $t: string
}

export interface Parameter14 {
    name: string
    id: string
    flags: string
    $t?: string
    parameter?: Parameter15[]
}

export interface Parameter15 {
    name: string
    id: string
    flags: string
    default?: string
    value?: string
    $t?: string
    FoldFlags?: FoldFlags
    parameter?: Parameter16[]
}

export interface FoldFlags {
    $t: string
}

export interface Parameter16 {
    name: string
    id: string
    flags: string
    default: string
    value: string
}

export interface Flags10 {
    $t: string
}

export interface Timing {
    in: string
    out: string
    offset: string
}

export interface FoldFlags {
    $t: string
}

export interface BaseFlags10 {
    $t: string
}

export interface Parameter17 {
    name: string
    id: string
    flags: string
}
