import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import {Car as ModelCar} from '../../database/model/Car'
import { CarData } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,

} from './styles'


interface Props extends RectButtonProps{
    data : ModelCar;
}

export function Car({data , ...rest} : Props){
    const MotorType = getAccessoryIcon(data.fuel_type)
    return(
        <Container {...rest} >
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${data.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorType />
                    </Type>
                </About>
            </Details>

            <CarImage source={{uri:data.thumbnail}} resizeMode='contain'/>
        </Container>
    )
}