import React, { useState } from "react";
import Select, { ICustomSelectProps } from "../../../Atoms/Select";
import makeHttpCall from "../../../../../utils/makeCall";

interface ISelectScheduleDataProps {
  value: string;
  label: string
}

const SelectScheduleData = (props: ICustomSelectProps) => {

  const [scheduleData, setScheduleData] = useState<ISelectScheduleDataProps[] | []>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function getScheduleData() {
    if (scheduleData.length !== 0) return
    setLoading(true)
    try {
      const scheduleOptions = await makeHttpCall({
        baseService: 'local', url: '/scheduling/date', method: 'GET'
      });
      if (scheduleOptions.status === 200 && scheduleOptions.data.length !== 0) {
        setScheduleData(scheduleOptions.data.map((option: any) => ({ value: option, label: option })))
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
      label="Data para Atendimento"
      onClick={async () => await getScheduleData()}
    >
      {scheduleData.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
    </Select>
  )
}

export default React.memo(SelectScheduleData)