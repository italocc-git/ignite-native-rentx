import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'


export const Container = styled.View`
    flex : 1;
    align-items: center;
    background-color: ${({theme}) => theme.colors.backgroundPrimary};
`

export const Header = styled.View`
    width : 100% ;
    height: 325px;

    padding-top : ${getStatusBarHeight() + 30}px;

    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.header};
    padding: 25px;
    
`

export const Title = styled.Text`
    color:${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.secondary600};
    font-size:${RFValue(30)}px;

    margin-top: 24px;
`

export const SubTitle = styled.Text`
    color:${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.secondary400};
    font-size:${RFValue(15)}px;

    margin-top: 24px;
`

    export const Content = styled.View`
        flex : 1;
        width : 100%;
        padding : 0 16px;

    `
    export const Appointments = styled.View`
        width: 100% ;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 24px 0;
    `
    export const AppointmentTitle = styled.Text`
        color:${({theme}) => theme.colors.text};
        font-family: ${({theme}) => theme.fonts.primary400};
        font-size:${RFValue(15)}px;
    `
    export const AppointmentQuantity = styled.Text`
        color:${({theme}) => theme.colors.title};
        font-family: ${({theme}) => theme.fonts.primary500};
        font-size:${RFValue(15)}px;
    `

    export const CarWrapper = styled.View`
        margin-bottom: 16px;
    `

    export const CarFooter = styled.View`
        width : 100% ;
        padding: 12px;

        margin-top : -10px;

        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: ${({theme}) => theme.colors.backgroundSecondary};
    `

    export const CarFooterTitle = styled.Text`
        color:${({theme}) => theme.colors.text_detail};
        font-family: ${({theme}) => theme.fonts.secondary500};
        font-size:${RFValue(10)}px;
    `

    export const CarFooterPeriod = styled.View`
        flex-direction: row;
    `

    export const CarFooterDate = styled.Text`
        color:${({theme}) => theme.colors.title};
        font-family: ${({theme}) => theme.fonts.primary400};
        font-size:${RFValue(13)}px;
    `