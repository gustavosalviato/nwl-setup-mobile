import { useEffect } from 'react';
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
interface ProgressBarProps {
  progress: number;
}
export function ProgressBar({ progress }: ProgressBarProps) {

  const sharedProgress = useSharedValue(progress)

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])
  return (
    <View className='w-full bg-zinc-700 rounded-xl h-3 mt-4 mb-6'>
      <Animated.View
        className='w-full bg-violet-500 rounded-xl h-3'
        style={style}
      >
      </Animated.View>
    </View>
  )
}