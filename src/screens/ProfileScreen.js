/* eslint-disable no-shadow */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Config from '../Config';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  if (photo !== undefined) {
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
const ProfileScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userProfile, setUserProfile] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [userCivilite, setUserCivilite] = useState('');
  const [userAdresse, setUserAdresse] = useState('');
  const [userVille, setUserVille] = useState('');

  const passwordInputRef = createRef();

  useFocusEffect(
    React.useCallback(() => {
      setUserProfile(null);
      setUserPassword('');
      setUserCivilite('');
      setUserAdresse('');
      setUserVille('');
      AsyncStorage.getItem('user_name').then(value => setUserName(value));
      AsyncStorage.getItem('user_id').then(value => setUserId(value));
      AsyncStorage.getItem('user_email').then(value => setUserEmail(value));

      let dataToSend = {user_id: userId, scope: 'getUser'};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch(Config.BACKEND_ENDPOINT + 'api_update_profile.php', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json.status === 'DATA_FOUND') {
            setUserCivilite(json.civilite);
            setUserAdresse(json.adresse);
            setUserVille(json.ville);
          }
        })
        .catch(error => console.log(error));
    }, [userId]),
  );

  const handleSubmitPress = () => {
    fetch(Config.BACKEND_ENDPOINT + 'api_update_profile.php', {
      method: 'POST',
      body: createFormData(userProfile === null ? undefined : userProfile[0], {
        scope: 'updateUser',
        user_id: userId,
        password: userPassword,
        adresse: userAdresse,
        civilite: userCivilite,
        ville: userVille,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Choose another picture
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response) {
        setUserProfile(response.assets);
      }
    });
  };

  const uri = Config.PROFILE_ENDPOINT + userId + '.jpg';

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={{
              uri: !userProfile ? uri : userProfile[0].uri,
            }}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <View style={styles.lineBreak} />
      <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserCivilite => setUserCivilite(UserCivilite)}
            placeholder={userCivilite ? userCivilite : 'Civilite'} //dummy@abc.com
            placeholderTextColor="#96499c"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            value={userCivilite}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserVille => setUserVille(UserVille)}
            placeholder={userVille ? userVille : 'Ville'} //dummy@abc.com
            placeholderTextColor="#96499c"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            value={userVille}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userAdresse => setUserAdresse(userAdresse)}
            placeholder={userAdresse ? userAdresse : 'Adresse'} //dummy@abc.com
            placeholderTextColor="#96499c"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            value={userAdresse}
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
            value={userPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  userEmail: {
    color: '#707070',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
  },
  lineBreak: {
    height: 0.5,
    backgroundColor: '#adacac',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  mainHeader: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  userInfo: {
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
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
});
