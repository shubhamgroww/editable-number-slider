import React, { PureComponent } from 'react';
import { TouchableOpacity} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../colors';

export default class CustomRipple extends PureComponent {
	render() {
		// Colors = Theme.getColors();
		const {
			rippleColor,
			rippleOpacity,
			style,
			onPress,
			rippleContainerBorderRadius,
			rippleDuration,
			rippleSize,
			nativeRipple
		} = this.props;
		
		if(!nativeRipple){
			return (
				<TouchableOpacity
					style={style}
					onPress={onPress}
				>
					{this.props.children}
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
				{this.props.children}
			</Ripple>
		);
	}
}

CustomRipple.defaultProps = {
	rippleOpacity: 0.1,
	rippleColor: colors.Ripple_Color,
	rippleDuration: 400,
	rippleContainerBorderRadius: 5,
	rippleSequential: false,
	disabled: false,
	rippleSize: 0,
};
