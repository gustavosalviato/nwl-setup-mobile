import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Alert, } from "react-native";
import { daySize, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

interface Summary {
  id: string
  amount: number
  completed: number,
  date: string,
}

export function Home() {
  const [summary, setSummary] = useState<Summary[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const summaryDates = generateRangeDatesFromYearStart()

  const minimumSummaryDatesSize = 18 * 5
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

  const { navigate } = useNavigation()

  async function getSummary() {
    try {
      setIsLoading(true)
      const res = await api.get('/summary')
      setSummary(res.data)
    } catch (err) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSummary()
    }, []))

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {summaryDates.map((summaryDate, i) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(summaryDate).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                date={summaryDate}
                completed={dayInSummary?.completed}
                amount={dayInSummary?.amount}
                key={summaryDate.toString()}
                onPress={() => navigate("habit", { date: summaryDate.toISOString() })}
              />
            )

          })}

          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <View
              key={i}
              className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800/60"
              style={{ width: daySize, height: daySize }}
            />
          ))}
        </View>
      </ScrollView>

    </View >
  )
}