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
    OfflineInfo,

} from './styles'
import { Button } from '../../components/Button'
import { useNavigation , useRoute } from '@react-navigation/native'
import {  RouteParams , CarData } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import Animated, { useSharedValue  , useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate} from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar, StyleSheet } from 'react-native'
import {useTheme} from 'styled-components'
import {useNetInfo} from '@react-native-community/netinfo'
import api from '../../services/api'


export function CarDetails(){
    const [carUpdated , setCardUpdated] = React.useState<CarData>({} as CarData)
    const netInfo = useNetInfo()
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

    React.useEffect(() => {
        async function fetchUpdatedCar() {
            const response = await api.get(`/cars/${car.id}`)
            setCardUpdated(response.data)    
        }

        if(netInfo.isConnected === true){
            fetchUpdatedCar()
        }
    },[netInfo.isConnected])

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
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos ? 
                            carUpdated.photos : [{id : car.thumbnail , photo : car.thumbnail}]
                        } 
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
                        <Price>{`R$ ${carUpdated.price ? car.price : '...'}`}</Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories && (
                        <Accessories>
                            {carUpdated.accessories.map(accessory => (
                            <Accessory key={accessory.type} 
                            name={accessory.name} 
                            icon={getAccessoryIcon(accessory.type)}
                            />
                    ))}

                </Accessories>
                    )
                }
                
                
                <About>
                   {car.about}
                </About>
                
            </Animated.ScrollView>
            <Footer>
                <Button title='Escolher per??odo de aluguel' enabled={!!carUpdated} onPress={handleConfirmRental}/>
            {netInfo.isConnected === false && (
                <OfflineInfo>
                    Conecte-se a internet para ver mais detalhes e agendar o seu carro
                </OfflineInfo>
            )}
            
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