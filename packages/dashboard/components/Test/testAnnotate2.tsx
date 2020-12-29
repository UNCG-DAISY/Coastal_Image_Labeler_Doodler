import { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import Skeleton from '@material-ui/lab/Skeleton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const testImage =
  'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

export default function TestAnnotate() {
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [imageRatio, setRatio] = useState(0)
  const [imgMaxSize, setImgMaxSize] = useState(512)
  let saveableCanvas = useRef<{ getSaveData: any }>(null)
  let loadableCanvas = useRef<{ getSaveData: any }>(null)
  useEffect(() => {
    const img = new Image()
    img.src = testImage
    img.onload = () => {
      //console.log(img.height,img.width)
      let tempRatio = 0
      if (img.height > img.width) {
        setRatio(imgMaxSize / img.height)
        tempRatio = imgMaxSize / img.height
      } else {
        setRatio(imgMaxSize / img.width)
        tempRatio = imgMaxSize / img.width
      }

      setImgWidth(tempRatio * img.width)
      setImgHeight(tempRatio * img.height)
    }
  }, [])

  return (
    <div>
      {imgWidth == 0 && imgHeight == 0 ? (
        <Skeleton variant="rect" width={512} height={512} />
      ) : (
        <div>
          {imageRatio}
          <CanvasDraw
            canvasWidth={imgWidth}
            canvasHeight={imgHeight}
            loadTimeOffset={10}
            imgSrc={testImage}
            ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
            hideGrid={false}
            gridColor="rgba(150,150,150,1)"
          />
          <Button
            onClick={() => {
              localStorage.setItem(
                'savedDrawing',
                //@ts-ignore
                saveableCanvas.getSaveData()
              )
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              //@ts-ignore
              localStorage.setItem(
                'savedDrawing',
                //@ts-ignore
                ''
              )
            }}
          >
            Clear
          </Button>
          <TextField
            id="imgSizer"
            type="number"
            helperText="Image Size (largest axis)"
            defaultValue={imgMaxSize}
            onChange={(event) => {
              const val = parseInt(event.target.value)
              setImgMaxSize(parseInt(event.target.value))

              let tempRatio = 0
              if (imgHeight > imgWidth) {
                setRatio(val / imgHeight)
                tempRatio = val / imgHeight
              } else {
                setRatio(val / imgWidth)
                tempRatio = val / imgWidth
              }

              setImgWidth(tempRatio * imgWidth)
              setImgHeight(tempRatio * imgHeight)
            }}
          />
          <Button
            onClick={() => {
              //@ts-ignore
              loadableCanvas.loadSaveData(localStorage.getItem('savedDrawing'))
            }}
          >
            Load
          </Button>
          <CanvasDraw
            disabled
            hideGrid
            ref={(canvasDraw) => (loadableCanvas = canvasDraw)}
            saveData={
              localStorage.getItem('savedDrawing') !== undefined
                ? localStorage.getItem('savedDrawing')
                : null
            }
          />
        </div>
      )}
    </div>
  )
}
