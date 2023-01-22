import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { BackButton } from '../components/BackButton'
import { CheckBox } from '../components/CheckBox'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useState } from 'react'
import { api } from '../lib/axios'

const availabeWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')

  function handleToogleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex))
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function createNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo Hábito', 'Informe o hábito e a periocidade!')
      }

      await api.post('/habits', {
        title,
        HabitWeekDays: weekDays
      })

      setTitle('')
      setWeekDays([])
      Alert.alert('Sucesso', 'Hábito criado com sucesso')

    } catch (err) {
      Alert.alert('Opa', 'Não foi  criar o hábito, tente novamente!')
      console.log(err)
    }
  }


  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual é seu compromentimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 mb-4 bg-zinc-900 border border-zinc-800 text-white focus:border focus:border-green-400"
          placeholder='Exercícios, beber água, etc..'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availabeWeekDays.map((day, i) => (
          <CheckBox
            key={`${day}-${i}`}
            checked={weekDays.includes(i)}
            title={day}
            onPress={() => handleToogleWeekDay(i)}

          />
        ))}


        <TouchableOpacity
          onPress={createNewHabit}
          activeOpacity={0.7}
          className="flex flex-row h-[52px] border bg-green-600 hover:bg-green-500 rounded-lg items-center justify-center font-semibold mt-6"
        >
          <Feather
            className='font-bold'
            name="check"
            size={20}
            color={colors.white}

          />

          <Text className="text-white ml-3 font-semibold text-base">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View >
  )
}