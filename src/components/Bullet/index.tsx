import React from 'react'

import {
    Container
} from './styles'

type Props = {
    active ?: boolean;
}

export function Bullet({ active = false} : Props){
    return(
        <Container active={active}/>
               /*  <ImageIndex 
                            key={String(index)}
                            active={index===imageIndex} /> */
        
    )
}