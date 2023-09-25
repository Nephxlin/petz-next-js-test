import React, { useState } from "react";
import Select, { ICustomSelectProps } from "../../../Atoms/Select";
import makeHttpCall from "../../../../../utils/makeCall";

interface ISelectScheduleDataProps {
  value: string;
  label: string
}
const SelectScheduleTime = (props: ICustomSelectProps) => {
  const [scheduleData, setScheduleTime] = useState<ISelectScheduleDataProps[] | []>([])
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const getScheduleTime = async () => {
    if (scheduleData.length !== 0) return
    setLoading(true)
    try {
      const scheduleOptions = await makeHttpCall({
        baseService: 'local', url: '/scheduling/time', method: 'POST', data: {
          date: ''
        }
      });

      if (scheduleOptions.status === 200 && scheduleOptions.data.length !== 0) {
        setScheduleTime(scheduleOptions.data.map((option: any) => ({ value: option, label: option })))
      }
      if (scheduleOptions.status === 200 && scheduleOptions.data.length === 0) {
        setScheduleTime([{ value: 'Sem opções', label: 'Sem opções de horarios' }])
      }
    } catch (error) {
      setScheduleTime([{ value: 'Erro no carregamento das datas', label: 'Sem opções de agendamento' }])
    }
    setLoading(false)
  }

  return (
    <Select
      {...props}
      label="Horário de Atendimento"
      onClick={async () => await getScheduleTime()}
    >
      {scheduleData.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
    </Select>
  )
}

export default React.memo(SelectScheduleTime)