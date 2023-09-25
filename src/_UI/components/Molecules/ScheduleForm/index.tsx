import * as S from './styles'
import { useCallback, useState } from 'react';
import Button from "../../Atoms/Button"
import Input from "../../Atoms/Input";
import Container from "../../Layout/Container"
import ScheduleFormCheckout from './ScheduleFormResult';
import Select from '../../Atoms/Select';
import { scheduleSchema } from "./schema";
import { formatCurrency } from '../../../../utils/formatCurrency';
import FormScheduleSelectApiRequest, { IFormSelectAPIFormat } from '../../../../services/ScheduleForm';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type FormData = z.infer<typeof scheduleSchema>;

interface IScheduleFormProps {
  submitScheduleForm: (data: FormData) => void
}

interface IFormSelectOptions {
  value: string;
  label: string;
}

const ScheduleForm = ({ submitScheduleForm }: IScheduleFormProps) => {
  const {
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, },
  } = useForm<FormData>({
    resolver: zodResolver(scheduleSchema),
  });

  const [pokemonList, setPokemonList] = useState<string[] | []>([''])
  const [pokemonsFormValues, setPokemonsFormValues] = useState<string[]>([])
  const [regions, setRegions] = useState<IFormSelectOptions[]>([])
  const [city, setCity] = useState<IFormSelectOptions[]>([])
  const [date, setDate] = useState<IFormSelectOptions[]>([])
  const [time, setTime] = useState<IFormSelectOptions[]>([])
  const [pokemon, setPokemon] = useState<IFormSelectOptions[]>([])
  const [selectRequestCity, setSelectRequestCity] = useState('')
  const [formSend, setFormSend] = useState(false)

  const handleAddPokemon = useCallback(() => {
    if (pokemonList.length === 6) return
    setPokemonList((prev) => [...prev, ''])
  }, [pokemonList])


  async function getSelectRequestOptions({ type, path }: IFormSelectAPIFormat) {
    const makeHttpCall = (await import("../../../../utils/makeCall")).default
    try {
      const regionResponse = await makeHttpCall(FormScheduleSelectApiRequest({ type, path }))
      if (regionResponse.status === 200) {
        switch (type) {
          case 'region':
            setRegions(regionResponse.data.results.map((option: any) => ({ value: option.name, label: option.name })))
            break
          case 'city':
            setCity(regionResponse.data.locations.map((option: any) => ({ value: option.name, label: option.name })))
            break
          case 'date':
            setDate(regionResponse.data.map((option: any) => ({ value: option, label: option })))
            break
          case 'time':
            setTime(regionResponse.data.map((option: any) => ({ value: option, label: option })))
            break
          case 'pokemon':
            setPokemon(regionResponse.data.results.map((option: any) => ({ value: option.name, label: option.name })))
            break
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  function addPokemonFormState(pokemon: string) {
    setPokemonsFormValues((prev) => [...prev, pokemon])
    setValue('pokemons', [...pokemonsFormValues, pokemon]);
  }

  async function onSubmit(data: FormData) {
    console.log(isSubmitting, 'submiting');
    console.log(data, 'data');
  }

  if (formSend) {
    return (
      <div>vacilou</div>
    )
  }

  return (
    <Container stylepattern='white'>
      <S.FormTitle>Preencha o formulário abaixo para agendar sua consulta</S.FormTitle>
      <S.FormContainer>
        <S.FormWrapper onSubmit={handleSubmit(submitScheduleForm)}>
          <S.FormRow>
            <Input
              onChange={(e) => setValue('nome', e.target.value)}
              onChangeCapture={() => clearErrors('nome')}
              error={errors?.nome && 'Nome é obrigatório'}
              label="Nome"
              type="text"
              placeholder="Digite seu nome" />
            <Input
              onChangeCapture={() => clearErrors('sobrenome')}
              onChange={(e) => setValue('sobrenome', e.target.value)}
              error={errors?.sobrenome && 'Sobrenome é obrigatório'}
              label="Sobrenome"
              type="text"
              placeholder="Digite seu sobrenome" />
          </S.FormRow>
          <S.FormRow>
            <Select
              label='Região'
              error={errors?.region && 'Região é obrigatória'}
              onChangeCapture={() => clearErrors('region')}
              onChange={(e) => {
                setValue('region', e.target.value)
                setSelectRequestCity(e.target.value)
              }}
              onClick={async () => await getSelectRequestOptions({ type: 'region' })}
            >
              {regions.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
            </Select>
            <Select
              label='Cidade'
              error={errors?.region && 'Cidade é obrigatória'}
              disabled={selectRequestCity === ''}
              onChangeCapture={() => clearErrors('city')}
              onChange={(e) => setValue('city', e.target.value)}
              onClick={async () => await getSelectRequestOptions({ type: 'city', path: selectRequestCity })}
            >
              {city.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
            </Select>
          </S.FormRow>
          <S.FwyForm>
            <S.FormLabel>
              Cadastre seu time
            </S.FormLabel>
            <S.InfoSpan>Atendemos até 06 pokémons por vez</S.InfoSpan>
            <S.FormRow>
              {pokemonList.map((e, index) => (
                <Select
                  key={e + index}
                  error={errors?.pokemons && 'Escolha um pokemon!'}
                  name={`pokemon-${index}}`}
                  direction='row'
                  label={`Pokemón ${index + 1}`}
                  onChange={(e) => addPokemonFormState(e.target.value)}
                  onClick={async () => await getSelectRequestOptions({ type: 'pokemon' })}
                >
                  {pokemon.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
                </Select>
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
            <Select
              label='Data para Atendimento'
              error={errors?.date && 'Data é obrigatória'}
              onChangeCapture={() => clearErrors('date')}
              onChange={(e) => setValue('date', e.target.value)}
              onClick={async () => await getSelectRequestOptions({ type: 'date' })}
            >
              {date.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
            </Select>
            <Select
              label='Horário de Atendimento'
              error={errors?.date && 'Horario é obrigatório'}
              onChangeCapture={() => clearErrors('time')}
              onChange={(e) => setValue('time', e.target.value)}
              onClick={async () => await getSelectRequestOptions({ type: 'time' })}
            >
              {time.map((option: any) => <option key={option.label} value={option.value}>{option.label}</option>)}
            </Select>
          </S.ScheduleTimeFormRow>
          <S.Hr />
          <ScheduleFormCheckout pokemons={pokemonsFormValues} />
          <S.SubmitFormRow>
            <S.InfoValue>Valor Total: {formatCurrency((70 * pokemonsFormValues.length + ((70 * pokemonsFormValues.length) / 100) * 3))}</S.InfoValue>
            <Button stylepattern='primary' type="submit">Concluir Agendamento</Button>
          </S.SubmitFormRow>
        </S.FormWrapper>
      </S.FormContainer>
    </Container>
  )
}

export default ScheduleForm