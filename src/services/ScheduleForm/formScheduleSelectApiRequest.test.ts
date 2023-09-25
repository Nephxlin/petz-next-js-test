import FormScheduleSelectApiRequest from './index';

describe('FormScheduleSelectApiRequest', () => {
  it('should return the correct API request for type "date"', () => {
    const result = FormScheduleSelectApiRequest({
      type: 'date',
      data: {},
    });

    expect(result).toEqual({
      baseService: 'local',
      url: '/scheduling/time',
      method: 'POST',
      data: {
        date: '',
      },
    });
  });

  it('should return the correct API request for type "time"', () => {
    const result = FormScheduleSelectApiRequest({
      type: 'time',
      data: {},
    });

    expect(result).toEqual({
      baseService: 'local',
      url: '/scheduling/time',
      method: 'POST',
      data: {
        date: '',
      },
    });
  });

  it('should return the correct API request for type "pokemon"', () => {
    const result = FormScheduleSelectApiRequest({
      type: 'pokemon',
      data: {},
    });

    expect(result).toEqual({
      baseService: 'pokeDex',
      url: '/pokemon',
      method: 'GET',
    });
  });

  it('should return the correct API request for type "city"', () => {
    const result = FormScheduleSelectApiRequest({
      type: 'city',
      data: {},
    });

    expect(result).toEqual({
      baseService: 'pokeDex',
      url: '/region',
      method: 'GET',
    });
  });

  it('should return the correct API request for type "region"', () => {
    const result = FormScheduleSelectApiRequest({
      type: 'region',
      data: {},
    });

    expect(result).toEqual({
      baseService: 'pokeDex',
      url: '/region',
      method: 'GET',
    });
  });
});
