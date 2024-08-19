import React, { useContext } from 'react'
import { LanguagesContext } from '../../context/LanguagesContext'
import { Language } from '../Language/Language'

export const Aside = () => {
  const languages = useContext(LanguagesContext)
  return (
    <aside className='aside'>
      <h2>Languages</h2>
      <div className='languages-container'>
      {
        languages.map((language, index) => {
          return <Language key={index} name={language} />
        })
      }
      </div>
    </aside>
  )
}
