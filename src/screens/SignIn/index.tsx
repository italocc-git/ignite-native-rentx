import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {KeyboardAvoidingView, StatusBar , TouchableWithoutFeedback , Keyboard, Alert} from 'react-native'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'
import theme from '../../styles/theme'
import * as Yup from 'yup'
import {useAuth} from '../../hooks/auth'
import {
    Container,
    Header,
    Form,
    Title,
    SubTitle,
    Footer,

} from './styles'

export function SignIn(){
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const navigation = useNavigation<any>()
    const {signIn} = useAuth()


    const handleSignIn = async() => {
        try {
            const schema = Yup.object().shape({
                email : Yup.string().email('Digite um email válido').required('E-mail obrigatório'),
                password : Yup.string().required('A senha é obrigatória')
            })

            await schema.validate({email, password})

            signIn({email, password})
        }

        catch(error){
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa' , error.message)
            }
            else {
                Alert.alert('Erro na Autenticação' , 'Ocorreu um erro ao fazer login, verifique as credenciais')
            }
        }

    }

    const handleNewAccount = () => {
        navigation.navigate('SignUpFirstStep')
    }

    return(
        <KeyboardAvoidingView
            behavior='position' enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle='dark-content'
                        translucent
                        backgroundColor='transparent'
                    />
                    <Header>
                        <Title>
                            Estamos {'\n'}
                            quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>
                    
                        <Form>
                            <Input
                            iconName='mail' placeholder='E-mail' 
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}

                            />
                            <InputPassword
                            iconName='lock' placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                            />
                        </Form>
                    
                    <Footer>

                        <Button title='Login' onPress={handleSignIn} 
                            enabled={true} loading={false}/>

                        <Button title='Criar conta gratuita' light
                        color={theme.colors.backgroundSecondary} onPress={handleNewAccount} 
                            enabled={true} loading={false}/>
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}