import { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import Skeleton from '@material-ui/lab/Skeleton'
import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

// const testImage =
//   'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

const colors = [
  {
    color: '#FF0000',
    name: 'line #1',
  },
  {
    color: '#00ffff',
    name: 'line #2',
  },
  {
    color: '#AABB00',
    name: 'line #3',
  },
]

export default function TestAnnotate(props: { drawingImage: string }) {
  const { drawingImage } = props

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [imageRatio, setRatio] = useState(1)
  const [imgMaxSize, setImgMaxSize] = useState(512)
  const [brushColor, setBrushColor] = useState(colors[0].color)
  const [brushSize, setBrushSize] = useState(12)
  const [lazyRadius, setLazyRadius] = useState(30)
  let saveableCanvas = useRef<{ getSaveData: any }>(null)
  // let loadableCanvas = useRef<{ getSaveData: any }>(null)

  function updateImageRatio(
    height: number,
    width: number,
    imgMaxAxisSize: number
  ) {
    if (height <= 0 || width <= 0 || imgMaxAxisSize <= 0) {
      return
    }

    let ratio = imageRatio ?? 1
    if (height > width) {
      ratio = imgMaxAxisSize / height
    } else {
      ratio = imgMaxAxisSize / width
    }
    setRatio(ratio)

    // setImgWidth(ratio * width)
    // setImgHeight(ratio * height)
  }

  useEffect(() => {
    const img = new Image()
    img.src = drawingImage
    img.onload = () => {
      updateImageRatio(img.height, img.width, imgMaxSize)
      setImgWidth(img.width)
      setImgHeight(img.height)
    }
    console.log(saveableCanvas)
  }, [])

  return (
    <div>
      {imgWidth == 0 && imgHeight == 0 ? (
        <Skeleton variant="rect" width={512} height={512} />
      ) : (
        <div>
          <CanvasDraw
            canvasWidth={imgWidth * imageRatio}
            canvasHeight={imgHeight * imageRatio}
            loadTimeOffset={10}
            imgSrc={drawingImage}
            ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
            brushColor={brushColor}
            lazyRadius={lazyRadius}
            brushRadius={brushSize}
          />

          <TextField
            id="imgSizer"
            type="number"
            helperText="Image Size (largest axis)"
            defaultValue={imgMaxSize}
            onChange={(event) => {
              const val = parseInt(event.target.value)
              setImgMaxSize(parseInt(event.target.value))
              updateImageRatio(imgHeight, imgWidth, val)
            }}
          />
          <TextField
            id="brushSizer"
            type="number"
            helperText="Size of brush"
            defaultValue={brushSize}
            onChange={(event) => {
              setBrushSize(parseInt(event.target.value) ?? 12)
            }}
          />
          <TextField
            id="lazySizer"
            type="number"
            helperText="Size of lazy radius"
            defaultValue={lazyRadius}
            onChange={(event) => {
              setLazyRadius(parseInt(event.target.value) ?? 30)
            }}
          />
          {colors.map((color, index) => {
            return (
              <button
                key={`color-${index}`}
                onClick={() => {
                  setBrushColor(color.color)
                }}
                style={{
                  color: color.color,
                }}
              >
                {color.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
