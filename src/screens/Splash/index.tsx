import React from 'react'

import {
    Container
} from './styles'

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import Animated,
    {useSharedValue , 
    useAnimatedStyle ,
    withTiming ,
    interpolate,
    runOnJS,
    Extrapolate
}  from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export function Splash(){
    const splashAnimation = useSharedValue(0)
    const {navigate} = useNavigation<any>()

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity:  interpolate(splashAnimation.value , 
                [0 , 25,  50],
                [1 , .3, 0],
            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value , 
                        [0, 50],
                        [0 , -50],
                        Extrapolate.CLAMP
                         )
                }
            ]
            
        }
    })

    const startApp = () => {
        navigate('SignIn')
    }

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity:  interpolate(splashAnimation.value , 
                [0 ,25,  50],
                [0 ,.3 , 1],
                
                ),
                transform: [
                    {
                        translateX: interpolate(splashAnimation.value , 
                            [0, 50],
                            [-50 , 0],
                            Extrapolate.CLAMP
                             )
                    }
                ]
                
            }
    })

    React.useEffect(() => {
        splashAnimation.value = withTiming(50 , { duration : 1000}, 
            () => {
                'worklet'
                runOnJS(startApp)() 
                /* Função será executada depois que a animação acbar */
                //Como animações funcionam em threads separadas, preciso dizer que depois da 
                //animação , ele execute o startApp com a Thread responsável por rodar o APP
            }) 
        
    },[])

    return(
        <Container>
            <Animated.View style={[brandStyle , {position:'absolute'}]}>  
               <BrandSvg  width={80} height={50}/> 
            </Animated.View>
            <Animated.View style={[logoStyle, {position:'absolute'}]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    )
}