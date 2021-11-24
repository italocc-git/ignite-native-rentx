import React from 'react'
import { BackButton } from '../../components/BackButton'
import {useTheme} from 'styled-components'
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles'
import Arrow from '../../assets/arrow.svg'
import {  StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Calendar ,  MarkedDateProps , DayProps} from '../../components/Calendar'
import { useNavigation, useRoute } from '@react-navigation/native'
import { generateInterval } from '../../components/Calendar/generateInterval'
import { getPlataformDate } from '../../utils/getPlataformDate'
import {format , parseISO} from 'date-fns'
import {  RouteParams } from '../../dtos/CarDTO'

interface RentalPeriod {
    
    startFormatted : string;
    endFormatted : string;
}



export function Schedulling(){
    const theme = useTheme()
    const [lastSelectedDate , setLastSelectDate] = React.useState<DayProps>({} as DayProps)
    const [markedDates , setMarkedDates] = React.useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod , setRentalPeriod] = React.useState<RentalPeriod>({} as RentalPeriod)
    const navigation = useNavigation<any>()
    
    const route = useRoute();
    const {car} = route.params as RouteParams;
    const handleConfirmRental = () => {
        
            
            navigation.navigate('SchedullingDetails' , {
                car,
                dates : Object.keys(markedDates)
            })
        
    }

    function handleChangeDate(date : DayProps ){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
        /*Se não existir timestamp , pegue a data passada por parametro, senão pegue a ultima data selecionada  */

        if(start.timestamp > end.timestamp){ /* Se a data inicial for maior q a final , inverta */
            start = end; 
            end = start;
        }

        setLastSelectDate(end);
        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length -1 ] /* array começa por indice 0 */

        setRentalPeriod({
            startFormatted : format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted : format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy')

        })


    }
   
    return(
        <Container>
            <Header>
                <StatusBar barStyle='light-content'
                translucent
                backgroundColor='transparent' />
                <BackButton color={theme.colors.shape} onPress={() => {navigation.goBack()}} />
                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>
                    
                    <Arrow/>

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button title='Confirmar' enabled={!!rentalPeriod.startFormatted}
                    /* style={{opacity : !!rentalPeriod.endFormatted ? 1 : 0.5}} */
                onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}