import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Posts from '../screens/Posts';
import MyDocs from '../screens/MyDocs';
import Favorites from '../screens/Favorites';
import UserCheck from '../screens/Auth/UserCheck';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import Profile from '../screens/Profile';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Splash from '../screens/Splash';

// Substitute signup
import SubstituteSignupFirstPage from '../screens/Auth/SubstituteOnboarding/SubstituteSignupFirstPage/';
import SubstituteSignupSecondPage from '../screens/Auth/SubstituteOnboarding/SubstituteSignupSecondPage/';
import EditExperience from '../screens/Auth/SubstituteOnboarding/EditExperience/';

// Structure signup
import StructureSignupFirstPage from '../screens/Auth/StructureOnboarding/StructureSignupFirstPage';
import StructureSignupSecondPage from '../screens/Auth/StructureOnboarding/StructureSignupSecondPage';
import StructureSignupThirdPage from '../screens/Auth/StructureOnboarding/StructureSignupThirdPage';
import AddDocBySearch from '../screens/Auth/StructureOnboarding/StructureSignupThirdPage/AddDocBySearch';
import AddDocByForm from '../screens/Auth/StructureOnboarding/StructureSignupThirdPage/AddDocByForm';
// Tab icons
import FolderGray from '../../assets/images/svg/Icons/FolderGray';
import FolderPurple from '../../assets/images/svg/Icons/FolderPurple';
import UsersGray from '../../assets/images/svg/Icons/UsersGray';
import UsersPurple from '../../assets/images/svg/Icons/UsersPurple';
import HeartGray from '../../assets/images/svg/Icons/HeartGray';
import HeartPurple from '../../assets/images/svg/Icons/HeartPurple';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Annonces') {
            return focused ? (
              <FolderPurple width={size} />
            ) : (
              <FolderGray width={size} />
            );
          } else if (route.name === "Mes Doc'") {
            return focused ? (
              <UsersPurple width={size} />
            ) : (
              <UsersGray width={size} />
            );
          } else if (route.name === 'Favoris') {
            return focused ? (
              <HeartPurple width={size} />
            ) : (
              <HeartGray width={size} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4863F5',
        inactiveTintColor: '#C2CAE7',
        style: {backgroundColor: '#FAFAFC'},
      }}>
      <Tab.Screen name="Annonces" component={Posts} />
      <Tab.Screen name="Mes Doc'" component={MyDocs} />
      <Tab.Screen name="Favoris" component={Favorites} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserCheck"
        component={UserCheck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubstituteSignupFirstPage"
        component={SubstituteSignupFirstPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubstituteSignupSecondPage"
        component={SubstituteSignupSecondPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditExperience"
        component={EditExperience}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StructureSignupFirstPage"
        component={StructureSignupFirstPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StructureSignupSecondPage"
        component={StructureSignupSecondPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StructureSignupThirdPage"
        component={StructureSignupThirdPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDocBySearch"
        component={AddDocBySearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDocByForm"
        component={AddDocByForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
