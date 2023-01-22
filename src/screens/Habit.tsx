import { View, ScrollView, Text, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { BackButton } from '../components/BackButton';
import dayjs from 'dayjs';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { HabitEmpty } from '../components/HabitEmpty';
import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progress-percentage'
import clsx from 'clsx';

interface Params {
  date: string;
}

interface DayInfo {
  possibleHabits: {
    id: string
    title: string
  }[]
  completed: string[]
}

export function Habit() {
  const [isLoading, setIsLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const router = useRoute()
  const { date } = router.params as Params

  const parsedDate = dayjs(date)
  const weekDay = parsedDate.format('dddd')
  const dayOfWeek = parsedDate.format('DD/MM')
  const dayInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function getHabits() {
    try {
      setIsLoading(true)
      const res = await api.get('/day', { params: { date } })
      setDayInfo(res.data)
      setCompletedHabits(res.data.completedHabits)
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Não foi possível carregar as informações do hábito');
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {

    await api.patch(`/habits/${habitId}/toggle`)

    if (completedHabits.includes(habitId)) {
      setCompletedHabits(prevState => prevState.filter((id) => id !== habitId))
    } else {
      setCompletedHabits(prevState => [...prevState, habitId])
    }
  }

  const currentProgress = completedHabits.length > 0 ? generateProgressPercentage(completedHabits.length, dayInfo!.possibleHabits.length) : 0

  useEffect(() => {
    getHabits()
  }, [])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <BackButton />

        <Text
          className='text-zinc-400 text-base font-semibold ml-2'
        >
          {weekDay}
        </Text>

        <Text
          className='text-white font-extrabold text-3xl mt-2 ml-2'
        >
          {dayOfWeek}
        </Text>

        <ProgressBar
          progress={currentProgress}
        />
        <View className={clsx('mt-1', {
          ['opacity-50']: dayInPast
        })}>

          {dayInfo!.possibleHabits.length > 0 ? dayInfo?.possibleHabits.map((habit) => {
            return (
              <CheckBox
                key={habit.id}
                title={habit.title}
                className='mb-3'
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={dayInPast}
              />
            )
          }) :
            <HabitEmpty />
          }
        </View>

        {
          dayInPast && (
            <Text className='text-base mt-10 text-zinc-400'>
              Você não pode editar hábitos de datas anteriores
            </Text>
          )
        }

      </ScrollView >
    </View >
  )
}