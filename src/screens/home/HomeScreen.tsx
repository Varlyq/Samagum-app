import { View, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from './components/HomeHeader'
import { Colors } from '../../styles'
import images from '../../assets/images'
import { Size } from '../../constants'
import { Container } from '../../components/Wrapper'
import MText from '../../components/Text'
import styles from './styles'
import UpcommingEvents from './components/UpcommingEvents'
import MyGroups from './components/MyGroups'
import CustomScroll from '../../components/CustomScroll'
import ExploreGroups from './components/ExploreGroups'
import FeatureGroup from './components/FeatureGroup'
import MostActiveGroup from './components/MostActiveGroup'
import FilterModal from './components/FilterModal'
import { fetchEventsThatYouJoined, fetchHomeDataAfterLogin, fetchMyAttendingEvents, fetchMySavedEvents, getAllGroupsAPI } from '../../API/api'
import AttendingEvents from './components/AttendingEvents'
import JoinedGroups from './components/JoinedGroups'
import { AllMyGroupsApi, ImOrganizingApi, MyGroupsApi } from '../../API/new api'

export default function HomeScreen({ navigation }: any) {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [homeData, setHomeData] = useState<any>([]);
    const [attendingEvents, setAttendingEvents] = useState<any>([]);
    const [savedEvents, setSavedEvents] = useState<any>([]);
    const [EventsThatYouJoined, setEventsThatYouJoined] = useState<any>([]);
    const [ImOrganizingEvents, setImOrganizingEvents] = useState<any>([]);
    const [joinedGroups, setJoinedGroups] = useState<any>([]);



    const nodata=[];

    useEffect(() => {
        fetchHomeDataAfterLogin((res) => {
            if (res !== null) {
                setHomeData(res?.data)
            }
        });

        fetchMyAttendingEvents((res) => {
            if (res !== null && res?.success?.toString() === "true") {
                setAttendingEvents(res?.data)
            }
        });

        fetchMySavedEvents((res) => {
            if (res !== null && res?.success?.toString() === "true") {
                setSavedEvents(res?.data)
            }
        });

        fetchEventsThatYouJoined((res) => {
            if (res !== null && res?.success?.toString() === "true") {
                setEventsThatYouJoined(res?.data)
            }
        });

        ImOrganizingApi((res) => {
            if (res !== null && res?.success?.toString() === "true") {
                setImOrganizingEvents(res?.data)
            }
        });

        getAllGroupsAPI((res) => {
            if (res !== null) {
                setJoinedGroups(res?.data?.groups)
                console.log(joinedGroups, "oooooooooooooooooooooooooooooooooo")
            }
        })
    }, [homeData]);

    return (
        <Container>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <View style={styles.container}>
                {/* Header */}
                <HomeHeader
                    searchInputCallback={() => { navigation?.navigate("SearchScreen") }}
                    onFilterPress={() => { setShowFilterModal(true) }}
                />
                <CustomScroll>
                    {/* Upcomming Events */}
                    <UpcommingEvents
                        title="I'm Attending"
                        data={attendingEvents}
                        navigationPage={"AttendingEventsScreen"}
                    />
                    <MText />

                    <AttendingEvents
                        title="My Watchlist"
                        data={savedEvents}
                        navigationPage={"MyWatchListScreen"}
                    />

                    <MText />

                    <AttendingEvents
                        title="Upcoming Events"
                        data={homeData?.upcoming_online_events}
                        navigationPage={"UpcomingEventsAll"}
                    />
                    <MText />

                    {/* <Image
                        source={images.home_invite} resizeMode="stretch"
                        style={{ width: Size.wWidth / 1.1, height: 140, alignSelf: "center" }}
                    /> */}

                    {/* <MyGroups
                        title="My Group's"
                        data={homeData?.events_from_groups_you_organize}
                    /> */}

                    {/* <ExploreGroups /> */}

                    <AttendingEvents
                        title="Featured Events"
                        data={nodata}
                        navigationPage={"FeaturedEventsScreen"}
                    />

                    <AttendingEvents
                        title="Near By Events"
                        data={nodata}
                        navigationPage={"NearbyEventsScreen"}
                    />

                    <AttendingEvents
                        title="Events from joined Groups"
                        data={EventsThatYouJoined}
                        navigationPage={"EventsFromJoinedGroupScreen"}
                    />

                    <UpcommingEvents
                        title="I’m Organizing"
                        data={homeData?.events_from_groups_you_organize} //imorganizingdata
                        navigationPage={"ImOrganizingScreen"}
                    />

                    <JoinedGroups
                        title="Groups I Own"
                        data={joinedGroups}
                        navigationPage={"GroupIOwnScreen"}
                    />

                    <JoinedGroups
                        title="Joined Groups"
                        data={joinedGroups}
                        navigationPage={"JoinedGroupScreen"}
                    />

                    <FeatureGroup
                        title="Most Vibrants Groups"
                        data={nodata}
                        navigationPage={"MostVibrantGroupsScreen"}
                    />


                    <View style={{ height: 100 }} />
                </CustomScroll>
            </View>

            <FilterModal
                visible={showFilterModal}
                setVisible={setShowFilterModal}
            />
        </Container>
    )
}
