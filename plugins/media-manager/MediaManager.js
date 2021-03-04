import React from 'react'
import Browser from './components/browser'

const MediaManager = ({ onSelect, onClose }) => {
  return (
    <Browser onSelect={onSelect} onClose={onClose} />
  )
}

export default MediaManager
