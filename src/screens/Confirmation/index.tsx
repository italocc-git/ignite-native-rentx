import React from 'react'
import {StatusBar, useWindowDimensions} from 'react-native'
import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles'
import LogoSvg from '../../assets/logo.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton'
import { useNavigation , useRoute } from '@react-navigation/native'


type Params = {
    title : string;
    message : string;
    nextScreen : string;
}

export function Confirmation(){
    const {width} = useWindowDimensions() /* hook que serve da mesma forma que a função Dimensions */

    const navigation = useNavigation<any>()
    
    const {params} = useRoute()

    const {title , message , nextScreen } = params as Params

    const handleConfirm = () => {
        navigation.navigate(nextScreen)
    }
    return(
        <Container>
            <StatusBar 
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>{title}</Title>

                <Message>
                    {message}
                    
                </Message>
            </Content>
            <Footer>
                <ConfirmButton title='OK' onPress={handleConfirm} />
            </Footer>
        </Container>
    )
}