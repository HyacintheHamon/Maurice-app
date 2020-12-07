import React, {FC, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {useRecoilState} from 'recoil';
import {emailState, specialtyOptionsState} from '../../../../atoms';
import {useForm} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import ArrowLeft from '../../../../../assets/images/svg/Icons/ArrowLeft';
import {
  DarkPurpleButton,
  DarkPurpleButtonText,
} from '../../../../components/Styled';
import {colors} from '../../../../constants';
import CustomInput from '../../../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import UploadGreen from '../../../../../assets/images/svg/Icons/UploadGreen.svg';
import UploadPurple from '../../../../../assets/images/svg/Icons/UploadPurple.svg';
import FileGreen from '../../../../../assets/images/svg/Icons/FileGreen.svg';
import ProfilePicturePlaceholder from '../../../../../assets/images/svg/Illustrations/ProfilePicturePlaceholder.svg';
import TextArea from '../../../../components/TextArea';

const {width} = Dimensions.get('window');

const SubstituteSignupFirstPage: FC = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [email, setEmail] = useRecoilState(emailState);
  const [specialtyPickerValue, setSpecialtyValue] = useState(specialtyOptions);
  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();
  const [isProfilePictureUpdating, setIsProfilePictureUpdating] = useState(
    false,
  );
  const [profileImg, setProfileimg] = useState('');
  // profilePicture to remove and call user.profilePicture
  const [profilePicture] = useState(false);
  const [isCertificateUpdating, setIsCertificateUpdating] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useRecoilState(
    specialtyOptionsState,
  );
  const [file, setFile] = useState(null);

  const {navigate} = useNavigation();

  useEffect(() => {
    register('rpps', {
      required: '* Champ obligatoire',
    });
    register('firstName', {
      required: '* Champ obligatoire',
    });
    register('lastName', {
      required: '* Champ obligatoire',
    });
    register('specialty', {
      required: '* Champ obligatoire',
    });
    register('city', {
      required: '* Champ obligatoire',
    });
    register('notes', {
      required: '* Champ obligatoire',
    });
  }, [register]);

  useEffect(() => {
    const getSpecialtyOptions = async () => {
      await firestore()
        .collection('specialties')
        .get()
        .then((response) => {
          const specialtyOptionsArray = response._docs.map((item) => ({
            label: item._data.name,
            value: item.id,
          }));
          setSpecialtyOptions(specialtyOptionsArray);
        });
    };
    getSpecialtyOptions();
  }, []);

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
        let fileName = getFileName(response.fileName, path);
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
      })
      .catch((e) => {
        status = 'Something went wrong';
        console.log('uploading image error => ', e);
        setIsProfilePictureUpdating(false);
        setStatus('Something went wrong');
      });
  };

  const showActionSheet = () => {
    this.ActionSheet.show();
  };

  const uploadCertificate = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      }).then((file) => {
        console.log(file);
        setFile(file);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const signUp = (data) => {
    //setLoading(true);
    navigate('SubstituteSignupSecondPage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonView}
        onPress={() => navigation.goBack()}>
        <ArrowLeft width="40" />
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>Inscription 1/3</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.form}>
            <Text style={styles.title}>Informations</Text>
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
            <CustomInput
              style={{marginTop: 30}}
              placeholder={'N° RPPS*'}
              label={'N° RPPS*'}
              name={'rpps'}
              onChangeText={(text) => setValue('rpps', text)}
              height={60}
              error={errors.rpps ? errors.rpps?.message : null}
            />
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Nom*'}
              label={'Nom*'}
              name={'lastName'}
              onChangeText={(text) => setValue('lastName', text)}
              height={60}
              error={errors.lastName ? errors.lastName?.message : null}
            />
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Prénom*'}
              label={'Prénom*'}
              name={'firstName'}
              onChangeText={(text) => setValue('firtName', text)}
              height={60}
              error={errors.firstName ? errors.firstName?.message : null}
            />
            <View
              style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 10,
                }),
              }}>
              <DropDownPicker
                placeholder="Choisir la spécialité*"
                items={specialtyOptions}
                defaultValue={specialtyPickerValue}
                containerStyle={styles.dropDownContainer}
                style={styles.dropDownPicker}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  fontSize: 14,
                  textAlign: 'left',
                  color: colors.darkGray,
                }}
                dropDownStyle={styles.dropDownStyle}
                onChangeItem={(item) => setSpecialtyValue(item.value)}
              />
            </View>
            {errors.specialty ? (
              <Text style={styles.error}>{errors.specialty?.message}</Text>
            ) : null}
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Ville*'}
              label={'Ville*'}
              name={'city'}
              onChangeText={(text) => setValue('city', text)}
              height={60}
              error={errors.city ? errors.city?.message : null}
            />
            <Text style={styles.sectionTitle}>MON CHAMP D’ACTION</Text>
            <TextArea
              placeholder="ex: soigner les bobos du quotidien"
              name="notes"
              error={errors.notes ? errors.notes?.message : null}
            />
            <Text style={styles.sectionTitle}>MON ATTESTATION D’ASSURANCE</Text>
            {file ? null : (
              <Text style={styles.description}>
                Télécharger ton attestation d’assurance permet aux structures de
                simplifier le processus de recrutement
              </Text>
            )}
            {isCertificateUpdating ? (
              <View style={styles.imageLoader}>
                <ActivityIndicator size="small" color="#999999" />
              </View>
            ) : file ? (
              <View style={styles.attachedCertificateView}>
                <FileGreen />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.fileName}>
                    {file.name}
                  </Text>
                  <View style={styles.fileDetailsRow}>
                    <Text style={styles.fileType}>
                      .{file.type.replace('application/', '')} |
                    </Text>
                    <Text style={styles.fileSize}> {file.size}ko</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.actionView}
                  onPress={showActionSheet}>
                  <FontAwesome5
                    style={styles.dots}
                    name="ellipsis-v"
                    size={15}
                    color={'#4863F5'}
                  />
                  <ActionSheet
                    ref={(o) => (this.ActionSheet = o)}
                    title={'Action'}
                    options={['Editer', 'Supprimer', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                      /* do something */
                      setFile(null);
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => uploadCertificate()}
                style={styles.uploadButton}>
                <UploadGreen />
                <Text style={styles.uploadButtonText}>
                  Importer mon attestation
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <DarkPurpleButton onPress={handleSubmit(signUp)}>
            {loading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            ) : (
              <DarkPurpleButtonText>Suivant</DarkPurpleButtonText>
            )}
          </DarkPurpleButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    height: 80,
  },
  headerTitleView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
  },
  backButtonView: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  scrollViewContent: {
    backgroundColor: colors.grayBackground,
    alignItems: 'center',
    paddingVertical: 60,
  },
  form: {
    flex: 1,
    width: width - 40,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
  },
  error: {
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    color: colors.pink,
  },
  loader: {
    paddingVertical: 5,
    alignItems: 'center',
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
  sectionTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    color: colors.darkGray,
    marginTop: 20,
  },
  selectPhoto: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: colors.purple,
    marginTop: 20,
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  description: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 20,
    lineHeight: 20,
    width: width - 80,
  },
  uploadButton: {
    height: 50,
    marginTop: 20,
    backgroundColor: 'rgba(57, 238, 201, 0.1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(57, 238, 201, 0.1)',
    borderRadius: 32,
  },
  uploadButtonText: {
    color: colors.green,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  imageSection: {
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  dropDownStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  actionView: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 20,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    textAlign: 'center',
  },
  attachedCertificateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  fileName: {
    marginLeft: 10,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    color: colors.black,
    maxWidth: 230,
  },
  fileDetailsRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  fileType: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    color: colors.darkGray,
  },
  fileSize: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    color: colors.lightGray,
  },
  bottomView: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 40,
  },
});

export default SubstituteSignupFirstPage;
