import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled , {css} from 'styled-components/native'

interface DateValueProps {
    selected : boolean;
}

export const Container = styled.View`
      flex: 1;
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    
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
    font-size:${RFValue(34)}px;

    margin-top: 24px;
`

export const RentalPeriod = styled.View`
    width: 100% ;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 32px 0;
`

export const DateInfo = styled.View`
    width : 30% ;
`

export const DateTitle = styled.Text`
    color:${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.secondary500};
    font-size:${RFValue(10)}px;

`

export const DateValue = styled.Text<DateValueProps>`
    color:${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.primary500};
    font-size:${RFValue(15)}px;


    ${(props) => !props.selected && css`
        border-bottom-width: 1px;
        border-bottom-color: ${props.theme.colors.text} ;
        padding-bottom: 5px;
    `}
`

export const Content = styled.ScrollView.attrs({
    contentContainerStyle : {
        paddingBottom : 24
    },
    showsVerticalScrollIndicator : false,
})`

`

export const Footer = styled.View`
    padding:24px;

`