import * as S from './styles'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../Atoms/Button';
import SuccessIcon from '../../Atoms/SVGS/SuccsessIcon';
import ErrorIcon from '../../Atoms/SVGS/ErrorIcon';
import formatData from '../../../../utils/formatDate';



interface IWarningContainerProps {
  result: 'success' | 'error'
  date?: string
  time?: string
  error?: string
}

function WarningContainer({ result, date, time, error }: IWarningContainerProps) {
  const router = useRouter()

  return (
    <S.Container>
      {result === 'success' ? (
        <S.Wrapper>
          <S.WarningTitle>Consulta Agendada</S.WarningTitle>
          <div>
            <SuccessIcon />
          </div>
          <S.WarningText>Seu agendamento para dia {date && formatData(date, 'slash')}, às {time}, para 0x pokémons foi realizado com sucesso!</S.WarningText>
          <Button stylepattern='primary' onClick={() => router.push('/agendar-consulta')}>Fazer Novo Agendamento</Button>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.WarningTitle>Houve um problema no agendamento</S.WarningTitle>
          <div>
            <ErrorIcon />
          </div>
          <S.WarningText>{error}</S.WarningText>
          <Button stylepattern='primary' onClick={() => router.push('/agendar-consulta')}>Fazer Novo Agendamento</Button>
        </S.Wrapper>
      )}
    </S.Container>
  );
}

export default WarningContainer;