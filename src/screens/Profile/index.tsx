import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {useTheme} from 'styled-components'
import { BackButton } from '../../components/BackButton'
import * as ImagePicker from 'expo-image-picker'
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import * as Yup from 'yup'
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from './styles'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'
import { useAuth } from '../../hooks/auth'
import { Button } from '../../components/Button'

type OptionState = 'dataEdit' | 'passwordEdit'

export function Profile(){
    const {user , signOut , updateUser } = useAuth()
    const theme = useTheme()
    const [option, setOption] = React.useState<OptionState>('dataEdit')
    const [avatar , setAvatar] = React.useState(user.photo)
    const [name , setName] = React.useState(user.name || '')
    const [driverLicense , setDriverLicense] = React.useState( user.driver_license || '')
    const navigation = useNavigation()
    
    function handleBack(){
        navigation.goBack()
    }
    function handleSignOut () {
        Alert.alert('Tem certeza ?' , 
        'Se você sair , irá precisar de internet para conectar-se novamente',
        [
            {
                text:'Cancelar',
                onPress: () => {},
                
            },
            {
                text: 'Sair',
                onPress: () => signOut()
            }
        ])
        
    }
    async function handleProfileUpdate(){
        try {
            const schema = Yup.object().shape({
                driverLicense : Yup.string().required('CNH é obrigatória'),
                name : Yup.string().required('Nome é obrigatório')
            })

            const data = { name , driverLicense}
            await schema.validate(data)

            await updateUser({
                id : user.id,
                user_id : user.user_id,
                email : user.email,
                name,
                photo : avatar,
                driver_license : driverLicense,
                token : user.token
            })
            Alert.alert('Perfil atualizado !')

        }catch(error) {
            if(error instanceof Yup.ValidationError)
            Alert.alert('Opa' , error.message)
            else
            Alert.alert('Não foi possível atualizar o perfil')
        }
    }

    async function handleSelectAvatar(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true,
            aspect : [4,4],
            quality: 1,
        })

        if(result.cancelled) return;

        if(result.uri) {
            setAvatar(result.uri)
        }
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                                <Feather color={theme.colors.shape} size={24} name='power'/>
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                           {!!avatar &&  <Photo source={{ uri: avatar}} /> } 
                            <PhotoButton onPress={handleSelectAvatar} >
                                <Feather name='camera' size={24} color={theme.colors.shape} />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                <Content style={{marginBottom : useBottomTabBarHeight()}}>
                    <Options>
                        <Option active={option === 'dataEdit'} onPress={() => {setOption('dataEdit')}}>
                            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                        </Option>
                        <Option active={option === 'passwordEdit'} onPress={() => {setOption('passwordEdit')}}>
                            <OptionTitle  active={option === 'passwordEdit'}>
                                Trocar senha
                                </OptionTitle>
                        </Option>
                    </Options>
                    {
                        option === 'dataEdit' ? 
                        (
                        <Section >
                            <Input iconName='user' placeholder='Nome' value={name} autoCorrect={false} defaultValue={user.name} onChangeText={setName}/>
                            <Input iconName='mail' editable={false}  defaultValue={user.email} />
                            <Input iconName='credit-card' value={driverLicense} placeholder='CNH' keyboardType='numeric' defaultValue={user.driver_license} onChangeText={setDriverLicense}/>
                        </Section>
                        )
                        : 
                        (
                        <Section >
                            <InputPassword iconName='lock'  placeholder='Senha Atual'  autoCorrect={false}/>
                            <InputPassword iconName='lock'  placeholder='Nova Senha'   autoCorrect={false}/>
                            <InputPassword iconName='lock' placeholder='Repetir Senha' keyboardType='numeric'/>
                        </Section>
                        )
                    }
                    <Button title='Salvar Alterações' onPress={handleProfileUpdate} />

                </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}