import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5
export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface HabitDayProps extends TouchableOpacityProps {
  completed?: number
  amount?: number
  date: Date
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) {
  const amountAccomplishedHabits = amount > 0 ? generateProgressPercentage(completed, amount) : 0

  const today = dayjs().startOf('day').toDate()

  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(' rounded-lg border-2 m-1 ', {
        'bg-zinc-900 border-zinc-800': amountAccomplishedHabits === 0,
        'bg-violet-900 border-violet-700': amountAccomplishedHabits > 0 && amountAccomplishedHabits < 20,
        'bg-violet-800 border-violet-600': amountAccomplishedHabits >= 20 && amountAccomplishedHabits < 40,
        'bg-violet-700 border-violet-500': amountAccomplishedHabits >= 40 && amountAccomplishedHabits < 60,
        'bg-violet-600 border-violet-500': amountAccomplishedHabits >= 60 && amountAccomplishedHabits < 80,
        'bg-violet-500 border-violet-400': amountAccomplishedHabits >= 80,
        'border-white border-4': isCurrentDay
      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
    />
  )
}