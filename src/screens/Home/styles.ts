import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {Car} from '../../database/model/Car'
import { CarData } from '../../dtos/CarDTO';


export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.backgroundPrimary};
`;

export const Header = styled.View`
   width: 100%;
   height: 113px;
   background-color: ${({theme}) => theme.colors.header};
   justify-content: flex-end;
   padding: 32px 24px;
 
`;

export const HeaderContent = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const TotalCars = styled.Text`
   font-size: ${RFValue(15)}px;
   color: ${({theme}) => theme.colors.text};
   font-family: ${({theme}) => theme.fonts.primary400};
`;


export const CarsList = styled(FlatList as new () => FlatList<Car>).attrs({
   contentContainerStyle: {
      padding: 24
   },
   showVerticalScrollIndicator: false
})`
`;
