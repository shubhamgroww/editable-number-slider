import React, { PureComponent } from 'react';
import { TouchableOpacity, GestureResponderEvent,  StyleProp, ViewStyle, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../colors';
import { $TSFixColors } from '../../types';

type CustomRippleProps = {
	rippleColor?: $TSFixColors;
	rippleOpacity?: number;
	style?: StyleProp<ViewStyle>;
	onPress: ((event: GestureResponderEvent) => void);
	rippleContainerBorderRadius?: number;
	rippleDuration?: number;
	rippleSize?: number;
	nativeRipple?: boolean;
	children: React.ReactNode;
}

export default class CustomRipple extends PureComponent<CustomRippleProps> {
	static defaultProps = {
		rippleOpacity: 0.1,
		rippleColor: colors.Ripple_Color,
		rippleDuration: 400,
		rippleContainerBorderRadius: 5,
		rippleSequential: false,
		disabled: false,
		rippleSize: 0,
	}
	render() {
		const {
			rippleColor,
			rippleOpacity,
			style,
			onPress,
			rippleContainerBorderRadius,
			rippleDuration,
			rippleSize,
			nativeRipple,
			children
		} = this.props;
		
		if(!nativeRipple){
			return (
				<TouchableOpacity
					style={style}
					onPress={onPress}
				>
					{children}
				</TouchableOpacity>
			)
		}
		return (
			<Ripple
				rippleOpacity={rippleOpacity}
				rippleContainerBorderRadius={rippleContainerBorderRadius}
				rippleDuration={rippleDuration}
				rippleColor={rippleColor}
				rippleSize={rippleSize}
				style={style}
				onPress={onPress}
			>
				{children}
			</Ripple>
		);
	}
}

