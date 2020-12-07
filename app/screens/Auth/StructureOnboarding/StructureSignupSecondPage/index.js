import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import UploadPurple from '../../../../../assets/images/svg/Icons/UploadPurple.svg';
import ProfilePicturePlaceholder from '../../../../../assets/images/svg/Illustrations/ProfilePicturePlaceholder.svg';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {
  DarkPurpleButton,
  DarkPurpleButtonText,
} from '../../../../components/Styled';
import TextArea from '../../../../components/TextArea';
import StepIndicator from '../../../../components/StepIndicator';
import {colors} from '../../../../constants';

const StructureSignupSecondPage: FC = () => {
  const {navigate} = useNavigation();
  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();
  const [profileImg, setProfileimg] = useState('');

  const [isProfilePictureUpdating, setIsProfilePictureUpdating] = useState(
    false,
  );
  // profilePicture to remove and call user.profilePicture
  const [profilePicture] = useState(false);

  useEffect(() => {
    register('notes', {
      required: '* Champ obligatoire',
    });
  }, [register]);

  const updateProfilePicture = () => {
    var options = {
      title: 'Sélectioner une image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      takePhotoButtonTitle: 'Prendre une photo',
      chooseFromLibraryButtonTitle: 'Importer depuis la gallerie',
      cancelButtonTitle: 'Annuler',
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let path = getPlatformPath(response).value;
        //let fileName = getFileName(response.fileName, path);
        let fileName = 'profile';
        setProfileimg(path);
        //setImagePath(path);
        uploadImageToStorage(path, fileName);
      }
    });
  };

  const getPlatformPath = ({path, uri}) => {
    return Platform.select({
      android: {value: path},
      ios: {value: uri},
    });
  };

  const getPlatformURI = (imagePath) => {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = {uri: imagePath};
      if (Platform.OS == 'android') {
        imgSource.uri = 'file:///' + imgSource.uri;
      }
    }
    return imgSource;
  };

  const getFileName = (name, path) => {
    if (name != null) {
      return name;
    }

    if (Platform.OS === 'ios') {
      path = '~' + path.substring(path.indexOf('/Documents'));
    }
    return path.split('/').pop();
  };

  const uploadImageToStorage = (path, name) => {
    setIsProfilePictureUpdating(true);
    let reference = storage().ref(name);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log('Image uploaded to the bucket!');
        setIsProfilePictureUpdating(false);
        setStatus('Image uploaded successfully');
        // Set url reference to users collection
      })
      .catch((e) => {
        status = 'Something went wrong';
        console.log('uploading image error => ', e);
        setIsProfilePictureUpdating(false);
        setStatus('Something went wrong');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('Tabs')}
        style={styles.skipButtonView}>
        <Text style={styles.skip}>Ignorer</Text>
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>Inscription 2/3</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StepIndicator
            titleOne="Ma structure"
            titleTwo="Mon petit plus"
            titleThree="Mes doc'"
            currentIcon={2}
          />
          <Text style={styles.title}>Mon petit plus</Text>
          <View style={styles.imageSection}>
            {isProfilePictureUpdating ? (
              <View style={styles.imageLoader}>
                <ActivityIndicator size="small" color="#999999" />
              </View>
            ) : (
              <View style={styles.profileImageView}>
                <TouchableOpacity onPress={() => updateProfilePicture()}>
                  {profileImg ? (
                    <FastImage
                      style={styles.profileImage}
                      source={{
                        uri: profileImg,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <ProfilePicturePlaceholder />
                  )}
                </TouchableOpacity>
                <View style={styles.uploadIconView}>
                  <UploadPurple width="15" />
                </View>
              </View>
            )}
            <Text style={styles.selectPhoto}>Ajouter une photo</Text>
          </View>
          <TextArea
            placeholder="ex : petit déjeuner, café, etc."
            name="notes"
          />
          <DarkPurpleButton
            style={{marginTop: 20}}
            onPress={() => navigate('StructureSignupThirdPage')}>
            <DarkPurpleButtonText>Suivant</DarkPurpleButtonText>
          </DarkPurpleButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  headerView: {
    height: 80,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
    marginTop: 40,
  },
  skipButtonView: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
  },
  skip: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 12,
    color: colors.purple,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    paddingVertical: 40,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    color: colors.darkGray,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  inlineTextView: {
    justifyContent: 'center',
    width: 40,
    marginTop: 15,
  },
  dropDownContainer: {
    marginTop: 20,
    height: 60,
    backgroundColor: colors.white,
    color: colors.black,
    borderColor: colors.lightGray,
    borderRadius: 12,
    borderWidth: 1,
  },
  dropDownPicker: {
    paddingVertical: 10,
    borderWidth: 0,
    borderColor: 'red',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 20,
    padding: 10,
  },
  input: {
    backgroundColor: colors.white,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.black,
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 12,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  predefinedPlacesDescription: {
    backgroundColor: colors.white,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  imageSection: {
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImageView: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  uploadIconView: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 50,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  selectPhoto: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: colors.purple,
    marginTop: 20,
  },
});

export default StructureSignupSecondPage;
