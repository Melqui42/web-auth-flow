import { z } from 'zod' // Alterado

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { AxiosError } from 'axios'
import axios from '../../axiosConfig'

import Alert from '../../components/Alert'
import Field from '../../components/Field'
import Form from '../../components/Form'
import { generatedCodeSchema } from '../../schemas/userSchema'

type FormProps = z.infer<typeof generatedCodeSchema>

const RecoverPassword: React.FC = () => {
  const [alert, setAlert] = useState<[boolean, string]>([false, ''])
  const [duration, setDuration] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    resolver: zodResolver(generatedCodeSchema),
  })

  const onSubmit = async (data: FormProps) => {
    try {
      const request = await axios.post('/recover-password/generated-code', data)

      if (request.data.status === 'success') {
        setAlert([true, request.data.message])
      }

      localStorage.setItem('passwordRecoveryToken', request.data.details.token)
      console.log(request.data.details.code)

      setTimeout(() => {
        reset()
        navigate('/recover-password/verify-code')
      }, 3000)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        if (err.response.data.status === 'error') {
          setAlert([false, err.response.data.message])
        }
      }
    }

    setDuration(true)

    setTimeout(() => {
      setDuration(false)
    }, 2500)
  }

  return (
    <div className="w-full h-screen absolute flex items-center justify-center">
      <Alert type={alert[0]} toggle={duration} message={alert[1]} />
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Header.Root>
          <Form.Header.Title>Esqueci minha senha</Form.Header.Title>
          <Form.Header.Description>
            Digite o endereço de e-mail da sua conta e enviaremos um e-mail com
            a confirmação para redefinir sua senha.
          </Form.Header.Description>
        </Form.Header.Root>
        <Field.Root errorMessage={errors.email?.message}>
          <Field.Input
            {...register('email')}
            type="text"
            placeholder="Insira seu e-mail"
          />
        </Field.Root>
        <Form.Action>CONTINUAR</Form.Action>
        <Link to="/signin" className="text-sm text-[#6f6f6f]">
          Voltar para o login.
        </Link>
      </Form.Root>
    </div>
  )
}

export default RecoverPassword
