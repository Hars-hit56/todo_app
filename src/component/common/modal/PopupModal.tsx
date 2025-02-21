import React from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {APP_PADDING_HORIZONTAL} from '../../../styles/commonStyles';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';

interface PopupModalProps {
  modalProps: any;
  children: any;
  visibleViewStyle?: StyleProp<ViewStyle>;
}

const PopupModal = ({
  modalProps,
  visibleViewStyle,
  children,
}: PopupModalProps) => {
  return (
    <>
      {modalProps.visible && (
        <>
          <Animatable.View
            // onPress={ modalProps.onRequestClose }
            style={[
              styles.transparentBlackView,
              modalProps.visible && {backgroundColor: colors.transparentBlack},
            ]}
            animation={'fadeIn'}
            duration={400}
            easing={'ease-in-out'}></Animatable.View>
        </>
      )}
      <Modal
        animationType={modalProps?.animationType || 'fade'}
        visible={modalProps.visible}
        onRequestClose={modalProps.onRequestClose}
        transparent={true}
        // {...props}
      >
        <View style={styles.mainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalTransparentTopContainer}
            onPress={modalProps.onRequestClose}
          />
          <View style={[styles.visibleViewStyle, visibleViewStyle]}>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
};

// PopupModal.prototype = {
//     style: 'Object'
// }

// PopupModal.defaultProps = {
//     children: "",
// }

const styles = StyleSheet.create({
  transparentBlackView: {
    width: spacing.FULL_WIDTH,
    height: '100%',
    backgroundColor: colors.transparent,
    position: 'absolute',
    paddingHorizontal: -APP_PADDING_HORIZONTAL,
    zIndex: 999,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTransparentTopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  visibleViewStyle: {
    // flex: 1,
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL,
    backgroundColor: colors.white,
    padding: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_16,
    position: 'absolute',
    marginHorizontal: APP_PADDING_HORIZONTAL,
    zIndex: 999999,
  },
  closeIconViewStyle: {
    backgroundColor: colors.white,
    padding: spacing.PADDING_8,
    borderRadius: spacing.RADIUS_90,
    marginBottom: spacing.MARGIN_12,
  },
});

export default PopupModal;
