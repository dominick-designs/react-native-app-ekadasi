import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Avatar, Button, ListItem, Icon, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
// const data = require('../components/data/data.json');
import * as data from '../components/data/data.json';

export default function HomeScreen() {

  return (

    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text>Hare Krsna! See below for the date of the next Ekadasi. NOTE: the name of the Ekadasi is stated after the Date.</Text>
          {/* <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          /> */}
        </View>

        <Card
          title={<TodaysEkadasi />}
        />


        <View style={styles.getStartedContainer}>
          <Text>{<TodaysEkadasi />}</Text>
          {/* <MonthsEkadasi /> */}
          {/* <TodaysEkadasi /> */}
          {/* <DevelopmentModeNotice />        
          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>
          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>
          <Text style={styles.getStartedText}>
            This is changed on machine. Change any of the text, save the file, and your app will automatically reload.
          </Text> */}

        </View>
        {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View> */}

      </ScrollView >

      <View style={styles.tabBarInfoContainer}>
        <OverlayNote />
        {/* <Text style={[styles.codeHighlightContainer]}>NOTE: All dates are for Vrndavana, India. For your local dates tap "Resources" below and tap "Pure Bhakti Calendar." You can configure your local time on Pure Bhatki.</Text> */}
        {/* <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View> */}
      </View>

    </View >
  );

}


function OverlayNote() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button buttonStyle={[styles.codeHighlightContainer]} title="Tap for important notice..." titleStyle={styles.codeHighlightText} onPress={toggleOverlay} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>NOTE: All dates are for Vrndavana, India. For your local dates tap "Resources" below and tap "Pure Bhakti Calendar." You can configure your local time on Pure Bhatki.</Text>
      </Overlay>
    </View>
  );
};



function MonthsEkadasi() {
  const year = new Date().getFullYear();
  //January = 0
  const month = new Date().getMonth();
  const dayOfMonth = new Date().getDate();
  //Sunday is 0, Monday is 1, and so on.
  const dayOfWeek = new Date().getDay();
  return (
    data.thisYear2020.map((data) => {
      if (data.monthId == month) {
        return (
          <View key={data.monthId}>
            {/* <Text>{data.monthName}</Text> */}
            <Text>{data.firstEkadasi}</Text>
            <Text>{data.secondEkadasi}</Text>
            <Text>{data.thirdEkadasi}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
          </View>
        )
      }
    })
  )
}


function TodaysEkadasi() {
  const year = new Date().getFullYear();
  //January = 0
  const month = new Date().getMonth();
  const dayOfMonth = new Date().getDate();
  //Sunday is 0, Monday is 1, and so on.
  const dayOfWeek = new Date().getDay();

  return (

    data.thisYear2020.map((data) => {

      // if day of month is greater than today's day of month
      if (data.monthId == month && data.firstEkadasi.dayInMonth > dayOfMonth) {

        return (
          <View key={data.monthId}>


            <Text style={{ fontSize: 25 }}>{data.firstEkadasi.dayOfWeek}, {data.monthName} {data.firstEkadasi.dayInMonth}: {data.firstEkadasi.ekadasiName}</Text>
          </View>
        )
      }
      // if day of month is greater than today's day of month
      if (data.monthId == month && data.secondEkadasi.dayInMonth > dayOfMonth) {
        return (
          <View key={data.monthId}>
            {/* <Text>{data.monthName}</Text> */}
            <Text style={{ fontSize: 25 }}>{data.secondEkadasi.dayOfWeek}, {data.monthName} {data.secondEkadasi.dayInMonth}: {data.secondEkadasi.ekadasiName}</Text>
          </View>
        )
      }

      if (data.monthId == month && data.thirdEkadasi.dayInMonth > dayOfMonth) {
        return (
          <View key={data.monthId}>
            {/* <Text>{data.monthName}</Text> */}
            <Text style={{ fontSize: 25 }}>{data.thirdEkadasi.dayOfWeek}, {data.monthName} {data.thirdEkadasi.dayInMonth}: {data.thirdEkadasi.ekadasiName}</Text>
          </View>
        )
      }

    })

  )
}




HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>

    );

    return (

      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});