import React from 'react'
import {Feather} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import {
    Container,
    IconContainer,
    InputText,
    


} from './styles'

import { BorderlessButton } from 'react-native-gesture-handler'
import { TextInputProps } from 'react-native'

interface Props extends TextInputProps {
    iconName : React.ComponentProps<typeof Feather>['name']
}

export function InputPassword({iconName ,value, ...rest} : Props){
    const [isFocused , setIsFocused] = React.useState(false)
    const [isFilled , setIsFilled] = React.useState(false)

    function handleInputFocus(){
        setIsFocused(true)
    }
    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!value)
    }



    const [isPasswordVisible , setIsPasswordVisible ] = React.useState(true)
    const theme = useTheme()
    return(
        <Container >
            <IconContainer isFocused={isFocused}>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ?  theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText secureTextEntry={!isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
            {...rest} />



            <BorderlessButton onPress={() => setIsPasswordVisible(prevState => !prevState)}>
                <IconContainer isFocused={isFocused}>
                    <Feather 
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    )
}