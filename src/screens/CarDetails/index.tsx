import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,

} from './styles'
import { Button } from '../../components/Button'
import { useNavigation , useRoute } from '@react-navigation/native'
import {  RouteParams } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import Animated, { useSharedValue  , useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate} from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar, StyleSheet } from 'react-native'
import {useTheme} from 'styled-components'



export function CarDetails(){

    const navigation = useNavigation<any>()

    const route = useRoute();
    const {car} = route.params as RouteParams;

    const theme = useTheme()

    const handleConfirmRental = () => {
        navigation.navigate('Schedulling' , {
            car
        })
    }
   

    const scrollY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
        /* console.log(event.contentOffset.y) */
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1 , 0],
                Extrapolate.CLAMP
            )
        }
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(scrollY.value,
                [0, 200], /* valor inicial */
                [200, 70], /* valor final (diminuindo)*/
                Extrapolate.CLAMP)
        }
    })

    return(
        <Container>
            <StatusBar barStyle='dark-content' translucent 
            backgroundColor='transparent' />

            <Animated.View style={[
                headerStyleAnimation ,
                 styles.header , 
                {backgroundColor: theme.colors.backgroundSecondary}
                ]}>
                <Header>
                    <BackButton onPress={() => {navigation.goBack()}}/>
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                     <CarImages> 
                        <ImageSlider imagesUrl={car.photos} 
                        />
                     </CarImages> 
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView 
                contentContainerStyle={{
                    paddingHorizontal:24 ,
                    paddingTop : getStatusBarHeight() + 160 ,
                    
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16} /* frames por segundo (no momento do scroll)*/
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>{`R$ ${car.price}`}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)}/>
                    ))}

                </Accessories>
                
                <About>
                   {car.about}
                </About>
                
            </Animated.ScrollView>
            <Footer>
                <Button title='Escolher período de aluguel' onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})