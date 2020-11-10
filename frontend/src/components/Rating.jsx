import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas, faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'


library.add(far, fas, faStar, faStarHalfAlt)
const Rating = ({value, text}) => {


  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon color='#f8e825' icon={value >= 1 ? 'star' : value >= 0.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}/>
        <FontAwesomeIcon color='#f8e825' icon={value >= 2 ? 'star' : value >= 1.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}/>
        <FontAwesomeIcon color='#f8e825' icon={value >= 3 ? 'star' : value >= 2.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}/>
        <FontAwesomeIcon color='#f8e825' icon={value >= 4 ? 'star' : value >= 3.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}/>
        <FontAwesomeIcon color='#f8e825' icon={value >= 5 ? 'star' : value >= 4.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}/>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

export default Rating