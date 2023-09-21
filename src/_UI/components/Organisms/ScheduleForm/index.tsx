import Button from "../../Atoms/Button"
import Input from "../../Atoms/Input";
import Select from "../../Atoms/Select";
import Container from "../../Layout/Container"
import * as S from './styles'


const ScheduleForm = () => {

  const options = ["Mangoes", "Apples", "Oranges"];
  return (
    <Container $stylePattern='white'>
      <S.FormTitle>Preencha o formulário abaixo para agendar sua consulta</S.FormTitle>
      <S.FormContainer>
        <S.FormWrapper>
          <S.FormRow>
            <Input label="Nome" type="text" id="nome" name="nome" placeholder="Digite seu nome" />
            <Input label="Sobrenome" type="text" id="sobrenome" name="sobrenome" placeholder="Digite seu sobrenome" />
          </S.FormRow>
          <S.FormRow>
            <Select label="Região" />
            <Select label="Cidade" />
          </S.FormRow>
          <S.FwyForm>
            <S.FormLabel>
              Cadastre seu time
            </S.FormLabel>
            <S.InfoSpan>Atendemos até 06 pokémons por vez</S.InfoSpan>
            <S.FormRow>
              <Select row label="Pokémon 01" />
              <Select row label="Pokémon 02" />
            </S.FormRow>
            <Button $stylePattern="secondary">Adicionar novo pokémon ao time... +</Button>
          </S.FwyForm>
          <S.Hr />
          <S.FormInfoContainer>
            <S.InfoText>Número de pokémons a serem atendidos:</S.InfoText>
            <S.InfoText>01</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Atendimento unitário por pokémon: </S.InfoText>
            <S.InfoText>R$ 70,00</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Subtotal:</S.InfoText>
            <S.InfoText>R$ 70,00</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Taxa geracional*: </S.InfoText>
            <S.InfoText>R$ 2,10</S.InfoText>
          </S.FormInfoContainer>
          <S.InfoSmallText>*adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%</S.InfoSmallText>
          <S.SubmitFormRow>
            <S.InfoValue>Valor Total: R$ 72,10</S.InfoValue>
            <Button $stylePattern='primary'>Concluir Agendamento</Button>
          </S.SubmitFormRow>

        </S.FormWrapper>
      </S.FormContainer>

    </Container>
  )
}

export default ScheduleForm