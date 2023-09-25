import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { scheduleSchema } from "./schema";

import * as S from './styles'
import Button from "../../Atoms/Button"
import Input from "../../Atoms/Input";
import Container from "../../Layout/Container"
import SelectRegion from "./SelectRegion";
import SelectScheduleData from "./SelectScheduleData";
import SelectScheduleTime from "./SelectScheduleTime";
import SelectPokemon from './SelectPokemon';
import SelectCity from "./SelectCity";
import { formatCurrency } from '../../../../utils/formatCurrency';

type FormData = z.infer<typeof scheduleSchema>;


const ScheduleForm = () => {
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(scheduleSchema),
  });

  const [pokemonList, setPokemonList] = useState<string[] | []>([''])
  const [pokemons, setPokemons] = useState<string[]>([])

  const handleAddPokemon = useCallback(() => {
    console.log('here')
    if (pokemonList.length === 6) return
    setPokemonList((prev) => [...prev, ''])
  }, [pokemonList])

  function addPokemonFormState(pokemon: string) {
    setPokemons((prev) => [...prev, pokemon])
    setValue('pokemons', [...pokemons, pokemon]);
  }


  async function onSubmit(data: FormData) {
    console.log(isSubmitting, 'submiting');
    console.log(data, 'data');
  }

  console.log()
  return (
    <Container stylepattern='white'>
      <S.FormTitle>Preencha o formulário abaixo para agendar sua consulta</S.FormTitle>
      <S.FormContainer>
        <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <Input
              onChange={(e) => setValue('nome', e.target.value)}
              error={errors?.nome && 'Nome é obrigatório'}
              label="Nome"
              type="text"
              placeholder="Digite seu nome" />
            <Input
              onChange={(e) => setValue('sobrenome', e.target.value)}
              error={errors?.sobrenome && 'Sobrenome é obrigatório'}
              label="Sobrenome"
              type="text"
              placeholder="Digite seu sobrenome" />
          </S.FormRow>
          <S.FormRow>
            <SelectRegion
              error={errors?.region && 'Região é obrigatória'}
              onChange={(e) => setValue('region', e.target.value)}
            />
            <SelectCity
              error={errors?.city && 'Cidade é obrigatória'}
              onChange={(e) => setValue('city', e.target.value)}
            />
          </S.FormRow>
          <S.FwyForm>
            <S.FormLabel>
              Cadastre seu time
            </S.FormLabel>
            <S.InfoSpan>Atendemos até 06 pokémons por vez</S.InfoSpan>
            <S.FormRow>
              {pokemonList.map((e, index) => (
                <SelectPokemon
                  key={e + index}
                  name={`pokemon-${index}}`}
                  direction='row'
                  label={`Pokemón ${index + 1}`}
                  onChange={(e) => addPokemonFormState(e.target.value)}
                />
              ))}
            </S.FormRow>
            <Button
              disabled={pokemonList.length === 6}
              stylepattern="secondary"
              type='button'
              onClick={handleAddPokemon}
            >Adicionar novo pokémon ao time... +
            </Button>
          </S.FwyForm>
          <S.ScheduleTimeFormRow>
            <SelectScheduleData
              error={errors?.date && 'Data é obrigatória'}
              onChange={(e) => setValue('date', e.target.value)}
            />
            <SelectScheduleTime
              error={errors?.time && 'Data é obrigatória'}
              onChange={(e) => setValue('time', e.target.value)}
            />
          </S.ScheduleTimeFormRow>

          <S.Hr />
          <S.FormInfoContainer>
            <S.InfoText>Número de pokémons a serem atendidos:</S.InfoText>
            <S.InfoText>{pokemons.length.toString().padStart(2, '0')}</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Atendimento unitário por pokémon: </S.InfoText>
            <S.InfoText>{formatCurrency(70)}</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Subtotal:</S.InfoText>
            <S.InfoText>{formatCurrency(70 * pokemons.length)}</S.InfoText>
          </S.FormInfoContainer>
          <S.FormInfoContainer>
            <S.InfoText>Taxa geracional*: </S.InfoText>
            <S.InfoText>{formatCurrency(((70 * pokemons.length) / 100) * 3)}</S.InfoText>
          </S.FormInfoContainer>
          <S.InfoSmallText>*adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%</S.InfoSmallText>
          <S.SubmitFormRow>
            <S.InfoValue>Valor Total: {formatCurrency((70 * pokemons.length + ((70 * pokemons.length) / 100) * 3))}</S.InfoValue>
            <Button stylepattern='primary' type="submit">Concluir Agendamento</Button>
          </S.SubmitFormRow>
        </S.FormWrapper>
      </S.FormContainer>
    </Container>
  )
}

export default ScheduleForm