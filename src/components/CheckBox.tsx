import { View, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated, { FlipInEasyX, FlipInEasyY } from 'react-native-reanimated'


interface CheckBoxProps extends TouchableOpacityProps {
  checked?: boolean,
  title: string
}

export function CheckBox({ checked = false, title, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={FlipInEasyX}
          exiting={FlipInEasyY}
        >
          <Feather
            name="check"
            color={colors.white}
          />
        </Animated.View>
      )
        : (
          <View
            className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg items-center justify-center" />
        )}

      <Text className="text-white ml-3">
        {title}
      </Text>

    </TouchableOpacity>
  )
}