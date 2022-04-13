import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomRipple from './components/CustomRipple';
import TextInputCustom from './components/TextInputCustom';
import { $TSFixColors } from './types';
import styles from './styles';
import { colors } from './colors';

type EditableNumberSliderProps = {
	prefix?: string;
	suffix?: string;
	containerStyle?: StyleProp<ViewStyle>;
	disabled?: boolean;
	maximumValue: number;
	minimumValue: number;
	minimumEditValue?: number; // Needed if you need a separate minimum value for EditText & Slider
	onValueChange?: Function;
	sliderStep?: number;
	initialValue?: number;
	editable?: boolean;
	rightElement?: Function;
	onEditStart?: Function;
	onSlidingStart?: Function;
	onEdit?: Function;
	absoluteMinima?: number; // Needed to protect slider going to a number below minimum in case of a flick
	formatValue: Function;
	customThumb?: string;
	minimumTrackTintColor?: string;
	maximumTrackTintColor?: string;
	thumbTintColor?: string;
	labelColor?: string;
	labelErrorColor?: string;
	nativeRipple?: boolean;
};

type EditableNumberSliderState = {
	value: number;
	inputError?: string;
	isEditing?: boolean;
	editStartValue?: number;
};

class EditableNumberSlider extends React.PureComponent<EditableNumberSliderProps, EditableNumberSliderState> {
	constructor(props: EditableNumberSliderProps) {
		super(props);
		const { initialValue } = this.props;
		this.state = {
			value: initialValue ?? 0,
		};
	}
	public static defaultProps = {
		initialValue: 70,
		nativeRipple: true,
		prefix: '',
		suffix: '',
		// labelColor: '#00000'
	};

	static getDefaultValue = (maximumValue: number, minimumValue: number, value?: number) => {
		return value && !isNaN(value) ? value : (maximumValue + minimumValue) / 2;
	};

	static getDerivedStateFromProps(props: EditableNumberSliderProps, state: EditableNumberSliderState) {
		if (state.value == null && props.initialValue) {
			return {
				value: EditableNumberSlider.getDefaultValue(props.maximumValue, props.minimumValue, props.initialValue),
			};
		}
		return null;
	}

	onSlide = (value: number) => {
		this.setState({ value });
		this.props.onValueChange?.(value);
	};

	getCorrectedValue = (number: number): number => {
		const { maximumValue, minimumValue, minimumEditValue } = this.props;
		const minValue = minimumEditValue ?? minimumValue;
		if (isNaN(number) || number < minValue) {
			return minValue;
		} else if (number > maximumValue) {
			return maximumValue;
		}
		return number;
	};

	checkNumber = (text: string) => {
		const number = parseInt(text.replace(/\D/g, ''));
		this.setState({
			inputError: number !== this.getCorrectedValue(number) ? 'invalid input' : '',
			value: !isNaN(number) ? number : 0,
		});
		if (number === this.getCorrectedValue(number)) {
			this.props.onValueChange?.(number);
		}
	};

	getSelectionColor = (Colors: $TSFixColors, error?: string) => {
		const labelErrorColor = this.props.labelErrorColor ?? Colors.error;
		const labelColor = this.props.labelColor ?? Colors.GREEN_BLUE;
		return error ? labelErrorColor: labelColor
	};

	getTextBackgroundColor = (Colors: $TSFixColors, error?: string) => {
		const labelErrorColor = this.props.labelErrorColor ?? Colors.error;
		const labelColor = this.props.labelColor ?? Colors.GREEN_BLUE;
		return `${error ? labelErrorColor : labelColor}20`;
	};

	handlEditStart = () => {
		const { disabled = false} = this.props;
		if(disabled)
		return;
		this.setState({ isEditing: true, editStartValue: this.state.value });
		this.props.onEditStart?.();
	};

	handlEditDone = () => {
		const number = this.state.value;
		this.props.onEdit?.(this.state.editStartValue, number);
		// Get corrected value to counter any incorrect entries
		const correctedValue = this.getCorrectedValue(number);
		this.setState({
			isEditing: false,
			value: correctedValue,
			inputError: '',
			editStartValue: -1,
		});
		this.props.onValueChange?.(correctedValue);
	};

	onSlidingComplete = () => {
		const correctedValue = Math.max(this.state.value, this.props.absoluteMinima ?? this.props.minimumValue);
		this.setState({ value: correctedValue });
		this.props.onValueChange?.(correctedValue);
	};

	render() {
		const {
			containerStyle = {},
			maximumValue,
			minimumValue,
			sliderStep = 1,
			editable,
			rightElement,
			onSlidingStart,
			formatValue,
			// customThumb = 'https://img.icons8.com/fluency/2x/thumb-up.png',
			customThumb,
			minimumTrackTintColor,
			maximumTrackTintColor,
			thumbTintColor,
			disabled=false,
			labelColor,
			prefix="$",
			suffix="",
			nativeRipple
		} = this.props;

		if (!maximumValue || minimumValue < 0 || minimumValue == null || isNaN(maximumValue) || isNaN(minimumValue)) {
			return null;
		}
		return (
			<View style={containerStyle}>
				<CustomRipple onPress={this.handlEditStart} nativeRipple={nativeRipple}>
					<View style={[styles.numberContainer, styles.container]}>
						{editable && this.state.isEditing ? (
							<View
								style={[
									styles.textInputContainer,
									{
										backgroundColor: this.getTextBackgroundColor(colors, this.state.inputError),
									}
								]}
							>
								<TextInputCustom
									style={[
										styles.textInput,
										{
											color: this.getSelectionColor(colors, this.state.inputError),
											opacity: 1
										},
									]}
									isUnderlineRequired={false}
									autoFocus
									onBlur={this.handlEditDone}
									onChangeText={this.checkNumber}
									returnKeyLabel="done"
									keyboardType="numeric"
									fullWidth={false}
									maxLength={20}
									value={
										this.state.value != 0
											? formatValue
												? formatValue(this.state.value)
												: `${prefix}${this.state.value}${suffix}`
											: ''
									}
									placeholder={''}
								/>
							</View>
						) : (
							<Text style={[styles.number, {...labelColor && { color: labelColor }}]}>
								{formatValue ? formatValue(this.state.value) : `${prefix}${this.state.value}${suffix}`}
							</Text>
						)}
						{rightElement ? (
							<View style={styles.rightElement}>{rightElement()}</View>
						) : (
							<CustomRipple onPress={this.handlEditStart} nativeRipple={nativeRipple} style={styles.rightElement}>
								{editable && this.state.isEditing && !this.state.inputError ? (
									<Icon name={'check'} color={this.props.labelColor ?? colors.GREEN_BLUE} size={28} />
								) : (
									<Icon name={'edit'} color={colors.SLATE_GREY} size={23} />
								)}
							</CustomRipple>
						)}
					</View>
				</CustomRipple>
				<Slider
					style={styles.slider}
					step={sliderStep}
					maximumValue={maximumValue}
					minimumValue={minimumValue}
					onValueChange={this.onSlide}
					value={this.state.value}
					minimumTrackTintColor={minimumTrackTintColor ?? colors.GREEN_BLUE}
					maximumTrackTintColor={maximumTrackTintColor ?? colors.ICON_GREY}
					thumbImage={customThumb ? { uri: customThumb } : undefined}
					onSlidingStart={() => onSlidingStart?.()}
					onSlidingComplete={this.onSlidingComplete}
					thumbTintColor={thumbTintColor}
					disabled={disabled}
				/>
			</View>
		);
	}
}

export default EditableNumberSlider;
