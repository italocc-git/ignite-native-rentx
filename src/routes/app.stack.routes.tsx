import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

const {Navigator , Screen} = createNativeStackNavigator()

import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Schedulling} from '../screens/Schedulling'
import {Confirmation} from '../screens/Confirmation'
import {SchedullingDetails} from '../screens/SchedullingDetails'
import { MyCars } from '../screens/MyCars'

export const AppStackRoutes = () => {
    return(
        <Navigator screenOptions={{
            headerShown: false,
        }} initialRouteName='Home'>
            <Screen name='Home' component={Home} /* options={{gestureEnabled:false}} *//>

            <Screen name='CarDetails' component={CarDetails}/>
            <Screen name='Schedulling' component={Schedulling}/>
            <Screen name='Confirmation' component={Confirmation}/>
            <Screen name='SchedullingDetails' component={SchedullingDetails}/>
            <Screen name='MyCars' component={MyCars}/>
        </Navigator>
    )
}