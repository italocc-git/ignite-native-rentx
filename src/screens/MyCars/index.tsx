import React from 'react'
import { CarData } from '../../dtos/CarDTO'
import api from '../../services/api';
import {StatusBar , FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

interface CarProps {
    car : CarData;
    user_id : string;
    id: string;
    startDate : string;
    endDate: string;
}

export function MyCars(){
    const [cars,setCars] = React.useState<CarProps[]>([])
    const [loading,setLoading] = React.useState(true);
    const navigation = useNavigation<any>()
    const theme = useTheme()

    React.useEffect(() => {
        const fetchCars = async() => {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
            }catch(error) {
                console.log(error)
            }finally {
                setLoading(false)
            }
        }
        fetchCars()
    },[])
    
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
                                    <CarFooterDate>{item.startDate}</CarFooterDate>
                                    <AntDesign 
                                        name='arrowright'
                                        size={20}
                                        color={theme.colors.title}
                                        style={{marginHorizontal : 10}}
                                    />
                                    <CarFooterDate>{item.endDate}</CarFooterDate>
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