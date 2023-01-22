import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export function HabitEmpty() {

  const { navigate } = useNavigation()
  return (
    <Text className='text-zinc-400 text-base'>
      Você ainda não está monitorando nenhum hábito {' '}

      <Text
        className='text-base underline text-violet-400 active:text-violet-500'
        onPress={() => navigate('new')}
      >
        comece cadastrando um!
      </Text>
    </Text>
  )
}