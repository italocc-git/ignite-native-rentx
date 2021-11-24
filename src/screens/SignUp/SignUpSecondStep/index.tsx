import React, { useState } from 'react'
import {useNavigation , useRoute} from '@react-navigation/native'
import { BackButton } from '../../../components/BackButton'
import * as Yup from 'yup'
import {
    Container,
    Header,
    Bullets,
    Title,
    SubTitle,
    Form,
    FormTitle,

} from './styles'

import { Bullet } from '../../../components/Bullet'

import { Button } from '../../../components/Button'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { InputPassword } from '../../../components/InputPassword'
import { useTheme } from 'styled-components'
import api from '../../../services/api'

interface Params {
    user : {
        name: string;
        email : string;
        driverLicense: string;
    }
    
}

export function SignUpSecondStep(){
    const navigation = useNavigation<any>()
    const {params} = useRoute()
    const theme = useTheme()
    const [password, setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const {user} = params as Params
   
    
    function handleBack(){
        navigation.goBack()
    }

    async function handleRegister(){
        if(!password || !confirmPassword ){
            return Alert.alert('Atenção' , 'Campo em Branco , favor preencher')
        }
        if(password !== confirmPassword){
            return Alert.alert('Atenção' , 'As senhas devem ser iguais! ')
        }

        
        await api.post('/users' , {
            name : user.name,
            email : user.email,
            driver_license : user.driverLicense,
            password
        }).then ( () => {
            navigation.navigate('Confirmation' ,
            {
            title: 'Conta Criada!' , 
            message: `Agora é só fazer login \n e aproveitar` ,
            nextScreen : 'SignIn'
        })
        }).catch((error) => {
            console.log(error)
            Alert.alert('Opa' , 'Não foi possível cadastrar')
        })


        
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack}/>
                        <Bullets>
                            <Bullet active/>
                            <Bullet active={false}/>
                        </Bullets>
                    </Header>

                    <Title>
                        Crie sua {'\n'} conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil
                    </SubTitle>
                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <InputPassword iconName='lock' placeholder='Senha' value={password}
                        onChangeText={setPassword}/>
                        <InputPassword iconName='lock' placeholder='Confirmar Senha' value={confirmPassword}
                        onChangeText={setConfirmPassword}/>
                    </Form>
                    <Button
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}