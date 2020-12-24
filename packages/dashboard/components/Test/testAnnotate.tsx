import ReactImageAnnotate from 'react-image-annotate'

const testImage =
  'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

export default function TestAnnotate() {
  return (
    <ReactImageAnnotate
      labelImages
      regionClsList={['Alpha', 'Beta', 'Charlie', 'Delta']}
      regionTagList={['tag1', 'tag2', 'tag3']}
      images={[
        {
          src: testImage,
          name: 'Image 1',
          regions: [],
        },
      ]}
      onExit={(output) => {
        console.log(JSON.stringify(output.images))
      }}
    />
  )
}
