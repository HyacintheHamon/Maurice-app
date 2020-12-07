import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import EmptyView from './EmptyView';
import Header from '../../components/Header';
import {colors} from '../../constants';

const MyDocs: FC = () => {
  const showEmptyView = () => {
    return <EmptyView />;
  };

  const showDocs = () => {
    return (
      <View style={styles.container}>
        <Text>Mes Doc'</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Mes doc'" />
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

export default MyDocs;
