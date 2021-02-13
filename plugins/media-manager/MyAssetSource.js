import React from 'react'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './MyAssetSource.css'

const imageData = [
  {
    kind: 'url',
    value: 'https://i.imgur.com/hT1E3ZL.jpg',
    assetDocumentProps: {
      originalFilename: 'bamse.jpg', // Use this filename when saving the image.
      source: {
        source: 'imgur', // The source this image is from
        id: 'hT1E3ZL', // A string that uniquely identifies it within the source
        url: 'https://imgur.com/hT1E3ZL' // Where to find more info about the asset
      },
      description: 'Bamse the Cat',
      creditLine: 'Bamse by Victoria'
    }
  },
  {
    kind: 'url',
    value: 'https://images.unsplash.com/photo-1613061433656-1cbfcfb23d96',
    assetDocumentProps: {
      originalFilename: 'bamse.jpg', // Use this filename when saving the image.
      source: {
        source: 'unsplash', // The source this image is from
        id: 'hT1E3ZL23', // A string that uniquely identifies it within the source
        url: 'https://unsplash.com/photos/ZAjoPssESXg' // Where to find more info about the asset
      },
      description: 'Great Sand Dunes National Park and Reserve',
      creditLine: 'By Ben Kelsey'
    }
  },
]

function MyAssetSource(props) {
  const handleSelect = (image) => {
    props.onSelect([{ ...image }]
    )
  }

  return (
    <Dialog title="Browse Assets" onClose={props.onClose} isOpen>
      <div>
        {imageData && imageData.map(image => (
          <img className={styles.image} src={image.value} onClick={() => handleSelect(image)} />
        ))}
      </div>
    </Dialog>
  )
}

export default MyAssetSource
