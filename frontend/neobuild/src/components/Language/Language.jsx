import React from 'react'
import './Language.css'

export const Language = ({name, tag=false}) => {
  return (
    <p className={`language ${tag ? "language-tag" : "" }`}>{name}</p>
  )
}
