import React from 'react'
import { CarData } from '../../dtos/CarDTO'
import api from '../../services/api';
import {StatusBar , FlatList} from 'react-native'
import { useNavigation , useIsFocused} from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentTitle,
    AppointmentQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,

} from './styles'
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import {Car as ModelCar} from '../../database/model/Car'
import { format, parseISO } from 'date-fns';

interface DataProps {
    id : string;
    car : ModelCar;
    start_date : string;
    end_date : string;
}

export function MyCars(){
    const screenIsFocus = useIsFocused()
    const [cars,setCars] = React.useState<DataProps[]>([])
    const [loading,setLoading] = React.useState(true);
    const navigation = useNavigation<any>()
    const theme = useTheme()

    React.useEffect(() => {
        const fetchCars = async() => {
            try {
                const response = await api.get('rentals');
                const dataFormatted = response.data.map((data: DataProps) => {
                    return {
                        id : data.id,
                        car: data.car,
                        start_date : format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date : format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }
                })
                setCars(dataFormatted);
            }catch(error) {
                console.log(error)
            }finally {
                setLoading(false)
            }
        }
        fetchCars()
    },[screenIsFocus])
    
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
                <SubTitle>
                    Conforto, Segurança e Praticidade.
                </SubTitle>
               
            </Header>
            {loading ? <LoadAnimation/>
            : (
                <Content>
                <Appointments>
                    <AppointmentTitle>Agendamentos Feitos</AppointmentTitle>
                    <AppointmentQuantity>{cars.length}</AppointmentQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <CarWrapper>
                            <Car data={item.car} />
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.start_date}</CarFooterDate>
                                    <AntDesign 
                                        name='arrowright'
                                        size={20}
                                        color={theme.colors.title}
                                        style={{marginHorizontal : 10}}
                                    />
                                    <CarFooterDate>{item.end_date}</CarFooterDate>
                                </CarFooterPeriod>
                                
                            </CarFooter>
                        </CarWrapper>
                    )}
                />
            </Content>
            )}
           
        </Container>
    )
}