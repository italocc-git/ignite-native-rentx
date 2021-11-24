import React from 'react'
import {Feather} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import {format} from 'date-fns'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { Alert } from 'react-native'
import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,

} from './styles'
import { Button } from '../../components/Button'
import { RouteParams } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlataformDate } from '../../utils/getPlataformDate'



interface RentalPeriod {
    start : string;
    end : string;
}

export function SchedullingDetails(){
    const theme = useTheme()
    const navigation = useNavigation<any>()

    const [rentalPeriod , setRentalPeriod] = React.useState<RentalPeriod>({} as RentalPeriod)
    const [isLoading, setIsLoading] = React.useState(false)
    const route = useRoute();
    const {car , dates} = route.params as RouteParams;

    const handleConfirmSchedulling = async() => {
        setIsLoading(true)
        /* Desafio , checar agendamentos antes de confirmar agendamento. 
        Caso tenha conflito de horário, exibir alerta p usuário */
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ]

        await api.post('schedules_byuser' , {
            user_id : 1 ,
            car,
            startDate : rentalPeriod.start,
            endDate : rentalPeriod.end,
        })

        api.put(`/schedules_bycars/${car.id}` , {
            id : car.id,
            unavailable_dates
        })
        .then(response => navigation.navigate('Confirmation' ,
         {
             title: 'Carro Alugado!' ,
             message: `Agora você só precisa ir \n até a concessionária da RENTX \n pegar o seu automóvel.` ,
             nextScreen : 'Home'
        }
             ))
        .catch(() => {
            setIsLoading(false)
            Alert.alert('Não foi possível confirmar o agendamento.')
        })


        
    }

    const rentTotal = Number(dates.length * car.price)
    React.useEffect(() => {
        setRentalPeriod({
            start : format(getPlataformDate(new Date(dates[0])) , 'dd/MM/yyyy' ),
            end : format(getPlataformDate(new Date(dates[dates.length -1])) , 'dd/MM/yyyy' ),
        })
    },[])

    return(
        <Container>
            <Header>
                <BackButton onPress={() => {navigation.goBack()}}/>
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} 
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)}/>
                    ))}
                    
                   
                </Accessories>
                
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                        name='calendar'
                        size={RFValue(24)}
                        color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                
                    <Feather 
                        name='chevron-right'
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>
            <Footer>
                <Button title='Alugar agora' loading={isLoading}
                 color={theme.colors.success} onPress={handleConfirmSchedulling}/>
            </Footer>
        </Container>
    )
}