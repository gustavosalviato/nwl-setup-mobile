import { TouchableOpacity, Text, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useNavigation } from "@react-navigation/native"



export function BackButton() {
  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleGoBack}
    >
      <Feather
        name="arrow-left"
        size={32}
        color={colors.zinc[400]}
      />


    </TouchableOpacity>
  )
}