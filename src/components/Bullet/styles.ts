import styled from 'styled-components/native'

type Props = {
    active ?: boolean;
}

export const Container = styled.View<Props>`
height: 6px;
width: 6px;
background-color: ${(props) => 
props.active ? props.theme.colors.title :
 props.theme.colors.shape };

 margin-left: 8px;
 border-radius: 3px;
`