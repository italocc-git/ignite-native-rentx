import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled ,{ css } from 'styled-components/native'

interface Props {
    isFocused : boolean;
}

export const Container = styled.View`
    flex-direction: row;

    
`

export const IconContainer = styled.View<Props>`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    margin-right: 2px;

    ${(props) => props.isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color:${props.theme.colors.main};
    `}
`


export const InputText = styled(TextInput)<Props>`
    flex-grow: 1; /* Ou flex : 1 */
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    color : ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary400};
    font-size: ${RFValue(15)}px;
    padding : 0 23px;


    ${(props) => props.isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color:${props.theme.colors.main};
    `}
`
