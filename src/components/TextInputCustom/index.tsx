import React, { Component } from 'react';
import {
	TextInput,
	Text,
	View,
	Platform,
	TouchableOpacity,
	TextInputProps,
	StyleProp,
	TextStyle,
	ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../colors';

type TextInputCustomProps = TextInputProps & {
	error?: string;
	errorStyle?: StyleProp<TextStyle>;
	isUnderlineRequired?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	centerStyle?: StyleProp<ViewStyle>;
	fullWidth?: boolean;
	buttonStyle?: StyleProp<ViewStyle>;
	prefix?: string;
	prefixStyle?:StyleProp<TextStyle>;
	suffix?: string;
}


class TextInputCustom extends Component<TextInputCustomProps> {
	constructor(props: TextInputCustomProps) {
		super(props);
	}
	static defaultProps = {
		placeholder: 'Enter Text', // Inherit any this.props passed to it; e.g., multiline, numberOfLines below
		editable: true,
		prefix: '',
		suffix: '',
		placeholderTextColor: colors.placeholderText,
		maxLength: 40,
		style: {},
		autoFocus: false,
		keyboardType: 'default', // other values default,numeric,email-address,phone-pad
		onChangeText: () => {},
		error: '',
		errorStyle: { fontSize: 10, color: 'red' },
		prefixStyle: {},
		secureTextEntry: false,
		returnKeyType: 'done', // other options are  done,go,next,search,send
		onSubmitEditing: () => {},
		autoCapitalize: 'none',
		selectTextOnFocus: false,
		isUnderlineRequired: true,
		underlineColorAndroid: colors.GRAY,
		fullWidth: true,
		containerStyle: {
			flexDirection: 'row',
			padding: 0,
			justifyContent: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: colors.GREEN_BLUE,
		},
		centerStyle: { flexDirection: 'row', padding: 0, justifyContent: 'center' },
		buttonStyle: { flex: 1, minHeight: 50 }
	}

	render() {
		const {
			error,
			errorStyle,
			isUnderlineRequired,
			underlineColorAndroid,
			containerStyle,
			centerStyle,
			autoFocus,
			fullWidth,
			buttonStyle,
		} = this.props;
		const iosStyle = {
			borderBottomWidth: 1,
			borderBottomColor: colors.SILVER,
		};
		return (
			<TouchableOpacity
				onPress={() => this.refs.input.focus()}
				style={buttonStyle}
			>
				<View style={isUnderlineRequired ? containerStyle : centerStyle}>
					{this.props.prefix != '' ? (
						<Text
							style={[
								{
									color: colors.PICKLED_BLUEWOOD,
									alignSelf: 'center',
									fontSize: 20,
									marginTop: Platform.OS == 'ios' ? 7 : 0,
								},
								this.props.prefixStyle,
							]}
						>
							{this.props.prefix}
						</Text>
					) : null}
					<TextInput
						ref={'input'}
						{...this.props}
						placeholder={this.props.placeholder} // Inherit any this.props passed to it; e.g., multiline, numberOfLines below
						editable={this.props.editable}
						placeholderTextColor={this.props.placeholderTextColor}
						maxLength={this.props.maxLength}
						style={[
							{
								fontSize: 24,
								marginTop: Platform.OS === 'ios' ? 10 : 5,
								fontWeight: 'normal',
								fontStyle: 'normal',
								letterSpacing: -0.19,
								textAlign: 'left',
								color: colors.BLACK,
							},
							fullWidth ? { width: '100%' } : {},
							Platform.OS == 'ios' && isUnderlineRequired ? iosStyle : {},
							this.props.style,
						]}
						returnKeyType={this.props.returnKeyType}
						keyboardType={this.props.keyboardType}
						value={`${this.props.value}`}
						onChangeText={this.props.onChangeText}
						secureTextEntry={this.props.secureTextEntry}
						underlineColorAndroid={
							isUnderlineRequired
								? this.props.error !== ''
									? colors.error
									: underlineColorAndroid
								: colors.transparent
						}
						onSubmitEditing={this.props.onSubmitEditing}
						allowFontScaling={false}
						autoFocus={autoFocus}
						selectionColor={this.props.selectionColor}
						autoCapitalize={this.props.autoCapitalize}
						selectTextOnFocus={this.props.selectTextOnFocus}
					/>
					{this.props.suffix != '' ? (
						<Text
							style={[
								{
									color: colors.PICKLED_BLUEWOOD,
									alignSelf: 'center',
									fontSize: 20,
								},
								this.props.prefixStyle,
							]}
						>
							{this.props.suffix}
						</Text>
					) : null}
				</View>
				<View>
					{error !== null && error !== '' ? (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingHorizontal: 2,
								marginTop: 5,
								flexWrap: 'wrap',
							}}
						>
							<Icon
								name={'error'}
								size={15}
								style={{
									marginRight: 5,
									color: 'red',
									alignSelf: 'flex-start',
								}}
							/>
							<Text style={errorStyle}>{error}</Text>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}
}
export default TextInputCustom;