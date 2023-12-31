import { View, Text, StatusBar, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container, Row } from '../../components/Wrapper'
import SettingsHeader from '../settings/container/SettingsHeader'
import MText from '../../components/Text'
import { Colors } from '../../styles'
import { Button } from 'react-native-paper'
import ImageButton from '../../components/ImageButton'
import { changePasswordApi } from '../../API/new api'
import Svg from '../../assets/svg'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';

export default function ChangePasswordScreen() {
    const navigation = useNavigation();


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [showInfo, setShowInfo] = useState(false);
       
    const handleChangePassword = async()=>{
        if(newPassword === repeatNewPassword){
        await changePasswordApi(currentPassword,newPassword, (result)=>{
            if (result.success === true) {
                console.log('change successfully:', result);
                navigation.goBack();
              } else {
                Toast.show("Please enter Currect Information", 1000)
              }
        })
        }else{
            Toast.show(" New Password isn't Same", 1000)
        }

    }

    const toggleinfo =()=>{
        if(showInfo === true)
       setShowInfo(false);
       else 
       setShowInfo(true);
    }

    

    return (
        <Container>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <SettingsHeader title='' />

            <View style={{ paddingHorizontal: 20 }}>
                <Row>
                <MText style={styles.title}>Change Password</MText>
                   <TouchableOpacity onPress={toggleinfo}  style={[styles.title, {marginLeft:10, justifyContent:"center", alignItems:"center"}]}>
                        <Svg.DownArrow />
                  </TouchableOpacity>
                </Row>

              {showInfo &&   
                <MText style={styles.subTitle}>
                    Your password must be at least six characters and should include a combination of numbers, letters and special characters (!$@%).
                </MText>
              }
                <ChangePasswordInput
                    placeholder='Current password'
                    onChange={(text) => { setCurrentPassword(text)}}
                />

                <ChangePasswordInput
                    placeholder='New password'
                    onChange={(text) => { setNewPassword(text)}}
                />

                <ChangePasswordInput
                    placeholder='Retype new password'
                    onChange={(text) => { setRepeatNewPassword(text)}}
                />

            </View>
            <ImageButton
                title="CHANGE PASSWORD"
                style={{ marginTop: "20%" }}
                onPress={handleChangePassword}
            />
        </Container>
    )
}

interface EditProfileInputProps {
    onChange: ((text: string) => void) | undefined;
    placeholder: string;
}

function ChangePasswordInput({ onChange, placeholder }: EditProfileInputProps) {
    return (
        <View style={{ marginTop: 6 }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={Colors.gray6}
                style={styles.inputStyle}
                onChangeText={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "#000000",
        marginTop: 10,
    },
    subTitle: {
        fontSize: 15,
        color: "#000000",
        lineHeight: 25,
        marginTop: 10,
    },
    inputStyle: {
        width: "100%",
        height: 52,
        borderWidth: 1,
        borderColor: "#E4DFDF",
        borderRadius: 14,
        alignSelf: "center",
        paddingHorizontal: 16,
        marginTop: 10,
        fontSize: 12,
        fontWeight: "400",
        color: "#3C3E56",
        backgroundColor: "#FFF",
    },
    forgotPassword: {
        color: "#5669FF",
        lineHeight: 23,
        marginLeft: 4
    }
})