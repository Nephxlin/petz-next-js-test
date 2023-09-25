import { IMakeCall } from "../../utils/makeCall"

export interface IFormSelectAPIFormat {
  type: 'date' | 'time' | 'pokemon' | 'city' | 'region'
  data?: any
  path?: string
}

function FormScheduleSelectApiRequest({type, data, path}:IFormSelectAPIFormat) {
  switch(type){
    case "date":
      return {
        baseService: 'local',
        url: '/scheduling/date',
        method: 'GET',
        extendPath: path,
        data: {
          date: '',
        },
      } as IMakeCall<'local'>
  case 'time':
    return {
      baseService: 'local',
      url: '/scheduling/time',
      method: 'POST',
      extendPath: path,
      data: {
        date: data,
      } 
    }as IMakeCall<'local'>
  case 'pokemon':
    return {
      baseService: 'pokeDex',
      url: '/pokemon',
      extendPath: path,
      method: 'GET'
    } as IMakeCall<'pokeDex'>
  case 'city':
    return {
      baseService: 'pokeDex',
      url: '/region',
      extendPath: path,
      method: 'GET'
    } as IMakeCall<'pokeDex'>
  case 'region':
    return {
      baseService: 'pokeDex',
      url: '/region',
      extendPath: path,
      method: 'GET'
    } as IMakeCall<'pokeDex'>
  }
}

export default FormScheduleSelectApiRequest