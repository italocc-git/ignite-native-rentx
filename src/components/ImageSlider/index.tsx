import React from 'react'
import { FlatList , ViewToken } from 'react-native'
import { Bullet } from '../Bullet'

import {
    Container,
    ImageIndexes,
   
    CarImageWrapper,
    CarImage,
} from './styles'

interface Props {
    imagesUrl : {
        id: string;
        photo : string;
    }[]
}

interface ChangeImageProps {
    viewableItems : ViewToken[];
    changed : ViewToken[];
}

export function ImageSlider({imagesUrl} : Props){

const [imageIndex , setImageIndex] = React.useState(0)

const indexChanged = React.useRef((info : ChangeImageProps) => {
    console.log(info) /* Consegue obter pelo indice a imagem do slider */
    const index = info.viewableItems[0].index!;
    setImageIndex(index)
})
    return(
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((item, index) => (
                        <Bullet 
                            key={String(item.id)}
                            active={index===imageIndex} />
                    ))
                }
                
                
            </ImageIndexes>

            
                <FlatList 
                    data={imagesUrl}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <CarImageWrapper>
                        <CarImage 
                            source={{uri:item.photo }}
                            resizeMode='contain'
                        />
                        </CarImageWrapper>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={indexChanged.current}
                />
               
            
        </Container>
    )
}