import React from 'react';
import {
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import {APP_PADDING_HORIZONTAL} from '../../../styles/commonStyles';
import {boxShadow} from '../../../styles/Mixins';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';

interface CommonModalProps {
  modalProps: ModalProps;
  hideCloseIcon?: boolean;
  visibleViewStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  children: any;
  backgroundType?: 'blur' | 'transparent' | 'none';
  transparentViewStyle?: StyleProp<ViewStyle>;
}

const CommonModal = ({
  modalProps,
  hideCloseIcon,
  visibleViewStyle,
  children,
  mainContainerStyle,
  transparentViewStyle,
}: CommonModalProps) => {
  return (
    <>
      <Modal
        animationType={modalProps?.animationType || 'fade'}
        visible={modalProps.visible}
        onRequestClose={modalProps.onRequestClose}
        transparent={true}
        {...modalProps}>
        <View style={[styles.mainContainer, mainContainerStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.transparentBlackView}
            onPress={modalProps.onRequestClose}>
            {/* <View
                            style={[styles.transparentBlackView, modalProps.visible && { backgroundColor: colors.transparentBlack }, transparentViewStyle]}
                        >
                        </View> */}
          </TouchableOpacity>
          <View style={[styles.visibleViewStyle, visibleViewStyle]}>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  transparentBlackView: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.transparentBlack,
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalTransparentTopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  visibleViewStyle: {
    width: spacing.FULL_WIDTH,
    backgroundColor: colors.white,
    padding: APP_PADDING_HORIZONTAL,
    borderTopLeftRadius: spacing.RADIUS_20,
    borderTopRightRadius: spacing.RADIUS_20,
    ...boxShadow(),
  },
  closeIconViewStyle: {
    backgroundColor: colors.white,
    padding: spacing.PADDING_8,
    borderRadius: spacing.RADIUS_90,
    marginBottom: spacing.MARGIN_12,
  },
});

export default CommonModal;
