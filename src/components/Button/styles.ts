import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
    color:string
}

type ButtonTextProps = {
    light : boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
    width: 100% ;
    padding : 19px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.color};
    margin-bottom: 8px;
`

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({theme}) => theme.fonts.primary500};
    font-size: ${RFValue(15)}px;
    color: ${({theme, light}) => 
    light ? theme.colors.header : theme.colors.shape };
`