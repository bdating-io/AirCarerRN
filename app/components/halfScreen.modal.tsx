import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface HalfScreenModalProps {
  heightPerc?: string;
  backgropColor?: string;
  children?: ReactNode;
  visibility?: boolean;
  persist?: boolean;
  [key: string]: any;
}

const HalfScreenModal = (props: HalfScreenModalProps) => {
  const { heightPerc="30%", backdropColor="none", children, persist=false, visibility } = props;
  const [modalVisible, setModalVisible] = useState(visibility);

  useEffect(() => {
    setModalVisible(visibility);
  }, [visibility]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: backdropColor,
    },
    modalContainer: {
      height: heightPerc, 
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      marginTop: 10,
      color: '#666',
    },
    inputBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#f0f0f5',
      borderRadius: 8,
    },
    placeholder: {
      color: '#999',
    },
    continueButton: {
      marginTop: 30,
      backgroundColor: '#f0f0f5',
      paddingVertical: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    continueText: {
      color: '#999',
      fontWeight: 'bold',
    },
  });

  const pressOut = () => {
    if (persist) return;
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>

      <Modal
        transparent={true}
        animationType={persist ? "none": "slide"}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPressOut={pressOut}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {children}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


export default HalfScreenModal;