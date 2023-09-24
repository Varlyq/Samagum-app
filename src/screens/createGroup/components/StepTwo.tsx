import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import CustomScroll from '../../../components/CustomScroll'
import ImageButton from '../../../components/ImageButton'
import MText from '../../../components/Text';
import MyCard from '../../../components/Wrapper/MyCard';
import images from '../../../assets/images';
import InputBox from '../../../components/InputBox';
import Svg from '../../../assets/svg';
import { Button } from 'react-native-paper';
import { Colors } from '../../../styles';

interface StepTwoProps {
    steps: number;
    setSteps: Function;
    visible: boolean;
}

export default function StepTwo({ steps, setSteps, visible }: StepTwoProps) {
    if (!visible) return null;

    const [location, setLocation] = useState("");

    function handleSubmit() {
        setSteps(3)
    }

    return (
        <>
            <CustomScroll>
                <View style={{ padding: 16 }}>
                    <MText style={styles.headText}>Step 2/4</MText>
                    <MyCard>
                        <Image
                            source={images.step2}
                            resizeMode="contain"
                            style={{ width: "100%", height: 28, marginVertical: 8 }}
                        />
                    </MyCard>

                    <MText style={styles.labelText}>
                        Choose a few topics that describe your group's interests
                    </MText>
                    <InputBox
                        value={location}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                            setLocation(val)
                        }}
                        placeholder='Search'
                        placeholderTextColor="#8D8D8D"
                        LeftIcon={<Svg.SearchBlueIcon />}
                        inputContainer={{ backgroundColor: "#F9F9F9" }}
                    />


                    <View style={styles.container}>
                        {
                            [
                                "Supper Club",
                                "Liberta, Di Informazione",
                                "Bilingual Spanish/English",
                                "New York",
                                "House Church",
                                "Novel Writing",
                                "New Moms",
                                "Social Activism",
                            ].map((item: any, indx: number) => {
                                return (
                                    <Button key={indx} style={styles.button}
                                        labelStyle={styles.buttonText}
                                        onPress={() => { }}
                                    >
                                        {item}
                                    </Button>
                                );
                            })
                        }
                    </View>
                </View>
            </CustomScroll>

            <ImageButton
                title="NEXT"
                style={{ position: "absolute", bottom: 120 }}
                onPress={handleSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    headText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        textAlign: "center",
        marginBottom: 16
    },
    labelText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000",
        marginBottom: -4,
        marginTop: 40
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        // marginLeft: 18
    },
    button: {
        borderRadius: 5,
        margin: 6,
        borderWidth: 1,
        borderColor: Colors.blue,
    },
    buttonText: {
        color: Colors.blue,
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 9,
        marginTop: 8,
        marginHorizontal: 18
    }
})