import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Row, SpaceBetweenRow } from '../../../components/Wrapper'
import Svg from '../../../assets/svg'
import MText from '../../../components/Text'
import { Styles } from '../../../styles';
import { useNavigation } from '@react-navigation/native'


export default function GroupsHeader( { pageName }) {
    const navigation = useNavigation();

    
    return (
        <View style={styles.container}>
            <SpaceBetweenRow>
                <Row>
                    <TouchableOpacity >
                        <Svg.BackIcon 
                        onPress={() => { navigation?.goBack()}}
                        />
                    </TouchableOpacity>
                    <MText style={styles.title}>{pageName}</MText>
                </Row>
            </SpaceBetweenRow>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%", height: 56,
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000",
        marginLeft: 14,
    },
})