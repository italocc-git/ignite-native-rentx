import React from 'react'
import  {Button , StyleSheet , Dimensions} from 'react-native'
import Animated , {useSharedValue , useAnimatedStyle , withTiming , Easing} from 'react-native-reanimated'

import {
    Container
} from './styles'


const WIDTH = Dimensions.get('window').width
export function SplashExample(){
    const animationExample = useSharedValue(0); //Criando animação (Como um estado)

    const animatedExampleStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX : withTiming(animationExample.value , {
                    duration: 1000,
                    /* easing : Easing.ease, */
                    easing : Easing.bezier(.73,.17,0,1.01),
                })
            }]
        }
    }) 

    function handleAnimationPosition(){
        animationExample.value = Math.random() *( WIDTH -100);
    }

    return(
        <Container>
            <Animated.View style={[styles.box , animatedExampleStyles]}  />

            <Button title='Mover' onPress={handleAnimationPosition} />
        </Container>
    )
}

const styles = StyleSheet.create({
    box : {
        width: 100,
        height: 100,
        backgroundColor: 'red'
        
    }
})