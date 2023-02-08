/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import Config from '../Config';
import AsyncStorage from '@react-native-community/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  if (photo != undefined) {
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  console.log(data);
  return data;
};

const SignupScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userCivilite, setUserCivilite] = useState('');
  const [userAdresse, setUserAdresse] = useState('');
  const [userVille, setUserVille] = useState('');
  const [userProfile, setProfile] = React.useState(null);
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');

    if (!userEmail) {
      return;
    }
    if (!userPassword) {
      return;
    }
    if (!userName) {
      return;
    }
    if (!userLastName) {
      return;
    }
    if (!userCivilite) {
      return;
    }
    if (!userVille) {
      return;
    }
    if (!userAdresse) {
      return;
    }

    fetch(Config.BACKEND_ENDPOINT + 'api_inscription.php', {
      method: 'POST',
      body: createFormData(userProfile[0], {
        email: userEmail,
        password: userPassword,
        nom: userName,
        prenom: userLastName,
        adresse: userAdresse,
        civilite: userCivilite,
        ville: userVille,
      }),
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'REGISTRATION_SUCCESS') {
          AsyncStorage.setItem('user_email', responseJson.email);
          AsyncStorage.setItem('user_name', responseJson.name);
          AsyncStorage.setItem('user_id', responseJson.user_id.toString());
          navigation.replace('AppNavigation');
        } else {
          setErrortext(responseJson.message);
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader
        console.log(error);
      });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response) {
        setProfile(response.assets);
      }
    });
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <View style={styles.imageSection}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image
                source={{
                  uri: !userProfile
                    ? Config.PROFILE_PLACEHOLDER
                    : userProfile[0].uri,
                }}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserName => setUserName(UserName)}
                placeholder="Nom" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserLastName => setUserLastName(UserLastName)}
                placeholder="Prenom" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#96499c"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserCivilite => setUserCivilite(UserCivilite)}
                placeholder="Civilite" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserVille => setUserVille(UserVille)}
                placeholder="Ville" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={userAdresse => setUserAdresse(userAdresse)}
                placeholder="Adresse" //dummy@abc.com
                placeholderTextColor="#96499c"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('LoginScreen')}>
              Already a member ? Login
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff9e8',
    alignContent: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: '#96499c',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#96499c',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#96499c',
  },
  registerTextStyle: {
    color: '#96499c',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: '#cc493d',
    textAlign: 'center',
    fontSize: 14,
  },
});
