// React
import React, {memo, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

// Components
import {View, Text, StyleSheet} from 'react-native';

export default memo(() => {
  const {navigate} = useNavigation();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    navigate('UserCheck');
  } else {
    navigate('Tabs');
  }

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text>Splash</Text>
    </View>
  );
});
