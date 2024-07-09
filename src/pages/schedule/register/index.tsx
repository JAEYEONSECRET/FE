import FooterButton from '@/components/common/button/FooterButton'
import Header from '@/components/layouts/header'
import useMountainsList from '@/hooks/useMountainsList.ts'
import { useState } from 'react'
import ScheduleFormSection from '@/pages/schedule/components/ScheduleFormSection.tsx'
import useMountainCourse from '@/hooks/useMountainCourse.ts'
import { useMutation } from '@tanstack/react-query'
import { registerSchedule } from '@/services/api/schedule'
import { format } from 'date-fns'

const RegisterSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [mountainsValue, setMountainsValue] = useState({ key: '', value: '' })
  const [mountainCourseValue, setMountainCourseValue] = useState({ key: '', value: '' })
  const [PersonnelValue, setPersonnelValue] = useState({ key: '', value: '' })
  const { data: mountainsListOption, isError: mountainsListError } = useMountainsList()
  const { data: mountainCourseOption, isError: mountainCourseError } = useMountainCourse(
    mountainsValue.value ? mountainsValue.value : null,
  )
  const registerScheduleMutation = useMutation({ mutationFn: registerSchedule })

  const handleSubmit = () => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''

    const scheduleData = {
      mntiListNo: mountainsValue.value,
      mntiCourse: mountainCourseValue.value,
      mntiStrDate: formattedDate,
      mntiPeople: PersonnelValue.value,
    }
    registerScheduleMutation.mutate(scheduleData)
  }

  return (
    <div className="flex h-full flex-col">
      <Header title="등산일정 등록" />
      <div className="flex h-full flex-col justify-between p-5">
        <ScheduleFormSection
          date={date}
          setDate={setDate}
          mountainsListOption={mountainsListOption}
          mountainsListError={mountainsListError}
          setMountainsValue={setMountainsValue}
          mountainCourseOption={mountainCourseOption}
          mountainCourseError={mountainCourseError}
          setMountainCourseValue={setMountainCourseValue}
          setPersonnelValue={setPersonnelValue}
        />
        <FooterButton onClick={handleSubmit}>일정 등록하기</FooterButton>
      </div>
    </div>
  )
}

export default RegisterSchedule
