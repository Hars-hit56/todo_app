import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';

const RegularText = (props: TextProps) => {
    return (
        <Text {...props}  style={[styles.text, props.style]} >
            {props.children}
        </Text>
    )
}


// RegularText.prototype = {
//     style: 'Object'
// }

// RegularText.defaultProps = {
//     children: "",
// }

const styles = StyleSheet.create({
    text: {
        color: colors.grey900,
        fontFamily: fontNames.FONT_FAMILY_REGULAR,
    }
})

export default RegularText;