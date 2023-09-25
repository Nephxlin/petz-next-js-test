import React, { useState } from "react";
import Select, { ICustomSelectProps } from "../../../Atoms/Select";
import makeHttpCall from "../../../../../utils/makeCall";

interface ISelectScheduleDataProps {
  label: string;
  value: string
}

const SelectCity = (props: ICustomSelectProps) => {
  const [scheduleData, setScheduleData] = useState<ISelectScheduleDataProps[] | []>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getCitie = async () => {
    if (scheduleData.length !== 0) return
    setLoading(true)
    try {
      const scheduleOptions = await makeHttpCall({ baseService: 'pokeDex', url: '/location', method: 'GET' })
      if (scheduleOptions.status === 200 && scheduleOptions.data.length !== 0) {
        setScheduleData(scheduleOptions.data.results.map((option: any) => ({ value: option.name, label: option.name })))
      }
      if (scheduleOptions.status === 200 && scheduleOptions.data.length === 0) {
        setScheduleData([{ value: 'Sem opções', label: 'Sem opções de agendamento' }])
      }
    } catch (error) {
      setScheduleData([{ value: 'Erro no carregamento das datas', label: 'Sem opções de agendamento' }])
    }
    setLoading(false)
  }

  return (
    <Select
      {...props}
      label="Cidade"
      onClick={async () => await getCitie()}
    >
      {scheduleData.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
    </Select>
  )
}

export default React.memo(SelectCity)