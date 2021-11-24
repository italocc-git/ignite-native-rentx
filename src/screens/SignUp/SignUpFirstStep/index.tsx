import React, { useState } from 'react'
import {useNavigation} from '@react-navigation/native'
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
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export function SignUpFirstStep(){
    const [name, setName] = useState('')
    const [email , setEmail] = useState('')
    const [driverLicense , setDriverLicense] = useState('')
    const navigation = useNavigation<any>()

    const handleNextStep = async() => {

        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                email : Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
                name : Yup.string().required('Nome é obrigatório'),

            })
            const data = {
                    name,
                    email, 
                    driverLicense
                }
            await schema.validate(data)

            navigation.navigate('SignUpSecondStep' , { user : data})
        }
        catch(error) {
            if(error instanceof Yup.ValidationError)
            Alert.alert('Erro', error.message )
            else 
            Alert.alert('Erro', 'Verifique as credenciais e tente novamente.')
        }
        
    }
    function handleBack(){
        navigation.goBack()
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
                        <FormTitle>1. Dados</FormTitle>
                        <Input iconName='user' placeholder='Nome' value={name} onChangeText={setName} />
                        <Input iconName='mail' placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
                        <Input iconName='credit-card' placeholder='CNH' value={driverLicense} onChangeText={setDriverLicense} keyboardType='numeric'/>
                    </Form>
                    <Button
                        title='Próximo'
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}