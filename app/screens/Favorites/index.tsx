import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import EmptyView from './EmptyView';
import Header from '../../components/Header';
import {colors} from '../../constants';

const Favorites: FC = () => {
  const showEmptyView = () => {
    return <EmptyView />;
  };

  const showFavorites = () => {
    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Mes favoris" />
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
});

export default Favorites;
