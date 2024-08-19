import React, { useContext } from 'react'
import { Languages } from '../Languages/Languages'

export const Aside = () => {
  return (
    <aside className='aside'>
      <h2>Languages</h2>
      <Languages />
    </aside>
  )
}
