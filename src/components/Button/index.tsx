import React from 'react'
import { ActivityIndicator } from 'react-native'
import {RectButtonProps} from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'
import {
    Container,
    Title,
} from './styles'

interface Props extends RectButtonProps {
    title : string;
    color?: string;
    loading ?: boolean;
    light ?: boolean;
    
}

export function Button({title , color ,loading =false , light= false , ...rest}: Props){
    const theme = useTheme()
    color = color ? color : theme.colors.main
    return(
        <Container color={color} enabled={!loading} style={{opacity : loading ? 0.5 : 1}} {...rest} >
            {!loading ? (
                <Title light>{title}</Title>
                
            ) : (
                <ActivityIndicator color={theme.colors.shape} />
            )}
            
           

        </Container>
    )
}