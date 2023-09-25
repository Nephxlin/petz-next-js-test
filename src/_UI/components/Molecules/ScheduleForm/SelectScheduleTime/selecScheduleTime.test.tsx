import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectScheduleTime from './index';
import makeHttpCall from '../../../../../utils/makeCall';

describe('SelectScheduleTime component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders SelectScheduleTime component with label', () => {
    render(<SelectScheduleTime />);

    // Verifique se o componente SelectScheduleTime foi renderizado
    const label = screen.getByText('Horário de Atendimento');
    expect(label).toBeInTheDocument();
  });

  test('loads and displays schedule options', async () => {
    const mockScheduleOptions = ['Option 1', 'Option 2'];
    const mockValue = ({ status: 200, data: mockScheduleOptions });

    render(<SelectScheduleTime />);

    // Espere até que a função getScheduleTime seja chamada
    await waitFor(() => {
      expect(makeHttpCall).toHaveBeenCalled();
    });

    // Verifique se as opções de agendamento são exibidas
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  test('displays "Sem opções" when no schedule options are available', async () => {
    const mockScheduleOptions = [''];
    const mockValue = ({ status: 200, data: mockScheduleOptions });

    render(<SelectScheduleTime />);

    // Espere até que a função getScheduleTime seja chamada
    await waitFor(() => {
      expect(makeHttpCall).toHaveBeenCalled();
    });

    // Verifique se a mensagem "Sem opções de horarios" é exibida
    const noOptionsMessage = screen.getByText('Sem opções de horarios');
    expect(noOptionsMessage).toBeInTheDocument();
  });

  test('displays error message on failed request', async () => {
    render(<SelectScheduleTime />);
    await waitFor(() => {
      expect(makeHttpCall).toHaveBeenCalled();
    });

    const errorMessage = screen.getByText('Erro no carregamento das datas');
    expect(errorMessage).toBeInTheDocument();
  });
});
