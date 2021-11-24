import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  api  from '../../services/api';
import { CarData } from '../../dtos/CarDTO';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'; 

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarsList,
} from './styles';


export function Home(){
const [ cars, setCars ] = useState<CarData[]>([]);
const [ loading, setIsLoading ] = useState(true);

const navigation = useNavigation<any>();
const theme = useTheme();

/* Animations */
     /* Criando botão animado baseado no rectButton */
const positionY = useSharedValue(0);
const positionX = useSharedValue(0);

const myCarsButtonStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value }, 
    ]
  }
});

const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);

    }
  });

  /* Navegations */
function handleCarDetails(car: CarData) {
  navigation.navigate("CarDetails", {car});
}

function handleOpenMyCars() {
  navigation.navigate("MyCars");
}

useEffect(() => {

  async function fetchCars() {
      try {
          
        const response = await api.get('/cars');
        
        setCars(response.data);

      } catch (error) {
        console.log(error);
        }
        finally {
          
          setIsLoading(false);
        }
  }
  
  fetchCars();

}, []);
/*
useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;  // Permitir utilizar o botão voltar no Android 
  })
}, [])
*/

return (
  <Container> 
    <StatusBar
     barStyle="light-content"  /* Somente para android essas duas props */
     backgroundColor="transparent" 
     translucent /* O header começa do início da tela e fica por trás do statusBar */ 
     />

    <Header>
      <HeaderContent>
      <Logo 
      width={RFValue(108)} 
      height={RFValue(12)}
      />

      {
      !loading &&
      <TotalCars>
       Total de {cars.length} carros
      </TotalCars>
      }

      </HeaderContent>
    </Header>

    { loading ? <LoadAnimation /> : 
    (
    <CarsList

    data={cars}
    keyExtractor={item => item.id}
    renderItem={({item}) => 
      <Car data={item} onPress={() => handleCarDetails(item)} />}
    
      /> 
      )
    } 

    <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
            style={[
            myCarsButtonStyle, 
            {
                position: 'absolute',
                bottom: 13,
                right: 22
            }
            ]}
        >
            <ButtonAnimated 
                onPress={handleOpenMyCars}
                style={[styles.button, {backgroundColor: theme.colors.main}]}
            >
                <Ionicons 
                        name="ios-car-sport"
                        size={32}
                        color={theme.colors.shape}
                />
            </ButtonAnimated>
        </Animated.View>
    </PanGestureHandler>
  </Container>
  );
}

const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    }
})