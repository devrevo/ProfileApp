import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.messageText}>This is a test App</Text>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '300',
  },
  messageText: {
    fontSize: 18,
    fontWeight: '300',
  },
});
