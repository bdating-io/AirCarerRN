import theme from '@app/constants/theme';
import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';

interface HalfScreenModalProps {
  heightPerc?: string;
  backgropColor?: string;
  children?: ReactNode;
  visibility?: boolean;
  persist?: boolean;
  [key: string]: any;
}

const HalfScreenModal = (props: HalfScreenModalProps) => {
  const { heightPerc = "30%", backdropColor = "none", children, persist = false, visibility=true, setVisibility } = props;

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
      shadowColor: theme.colors.shadow,
      ...Platform.select({
        ios: {
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.3,
        },
        android: {
          elevation: 5,
        },
      }),
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
    setVisibility(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType={persist ? "none" : "slide"}
        visible={visibility}
        onRequestClose={() => setVisibility(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPressOut={pressOut}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


export default HalfScreenModal;