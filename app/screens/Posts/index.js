import React, {FC, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {tokenState} from '../../atoms';
import EmptyView from './EmptyView';
import Header from '../../components/Header';
import {colors} from '../../constants';

const Posts: FC = () => {
  const [token] = useRecoilState(tokenState);
  const [postsList, setPostsList] = useState([]);

  const renderList = () => {
    if (postsList.length < 1) {
      showEmptyView();
    } else {
      showPosts();
    }
  };

  const showEmptyView = () => {
    return <EmptyView />;
  };

  const showPosts = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Annonces</Text>
        <Text>{token}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Annonces" />
      {showEmptyView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.darkGray,
    lineHeight: 25,
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 40,
  },
});

export default Posts;
