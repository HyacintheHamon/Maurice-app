import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RoundedBackground from '../../components/RoundedBackground';
import ArrowLeft from '../../../assets/images/svg/Icons/ArrowLeft';
import {colors} from '../../constants';
import Card from '../../components/Card';
import FastImage from 'react-native-fast-image';
import ProfilePictureBackground from '../../../assets/images/svg/Illustrations/ProfilePictureBackground';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

const Profile: FC = ({navigation}) => {
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigation();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
    navigate('UserCheck');
  };

  useEffect(() => {
    // Get Profile picture
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <RoundedBackground
        customStyles={styles.svgCurve}
        customHeight={350}
        customTop={0}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonView}
          onPress={() => navigation.goBack()}>
          <ArrowLeft width="20" />
        </TouchableOpacity>
        <View style={styles.ProfileImageView}>
          <ProfilePictureBackground
            width="142"
            height="115"
            style={styles.profilePictureBackground}
          />
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <FastImage
              style={styles.profilePicture}
              source={{
                uri: profilePicture,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Catherine Denise</Text>
          <Text style={styles.subtitle}>Radiologue</Text>
          <View style={styles.rppsView}>
            <Text style={styles.rppsViewText}>RPPS n°104957442103</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Card>
          <View style={styles.cardContent}>
            <Text style={styles.rating}>5/5</Text>
            <Rating
              type="custom"
              ratingColor="#FFBE5E"
              //ratingBackgroundColor="#FFFFFF"
              ratingCount={5}
              imageSize={15}
              //showRating
              startingValue={5}
              readonly={true}
              onFinishRating={this.ratingCompleted}
              style={{paddingVertical: 10}}
            />
            <Text style={styles.cardDescriptionText}>Retard : 0% (0/8)</Text>
            <Text style={styles.cardDescriptionText}>
              Appréciation globale : 100% (8/8)
            </Text>
            <Text style={styles.cardDescriptionText}>
              Réactivité : 100% (14/14)
            </Text>
          </View>
        </Card>
        <View style={styles.row}>
          <Card>
            <View style={styles.statCardContent}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Jours remplacés</Text>
            </View>
          </Card>
          <Card>
            <View style={styles.statCardContent}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Désistement(s)</Text>
            </View>
          </Card>
          <Card>
            <View style={styles.statCardContent}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Absences</Text>
            </View>
          </Card>
        </View>
        <Card>
          <View style={styles.textCardContent}>
            <Text style={styles.cardTitle}>Champ d’action</Text>
            <Text style={styles.textCardContentText}>
              Radios du poignet et de la hanche
            </Text>
          </View>
        </Card>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={{textAlign: 'center'}}>log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 24,
  },
  backButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 16,
  },
  ProfileImageView: {
    alignItems: 'center',
  },
  profilePictureBackground: {
    position: 'absolute',
  },
  profilePicture: {
    width: 88,
    height: 88,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.yellow,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.white,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.lightGray,
    marginTop: 10,
  },
  rppsView: {
    backgroundColor: '#E8EBFB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 24,
    position: 'absolute',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: -70,
  },
  rppsViewText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.purple,
  },
  mainContainer: {
    flex: 1,
    marginTop: 100,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.41,
    padding: 10,
    borderRadius: 24,
    margin: 10,
  },
  cardContent: {
    padding: 40,
  },
  rating: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
  },
  cardDescriptionText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  statCardContent: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    alignItems: 'center',
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 9,
    color: colors.darkGray,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  cardTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
    marginTop: 20,
  },
  textCardContent: {
    alignItems: 'flex-start',
    padding: 20,
  },
  textCardContentText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.darkGray,
    marginTop: 10,
  },
});

export default Profile;
