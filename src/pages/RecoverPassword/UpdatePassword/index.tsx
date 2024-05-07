import { z } from 'zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { AxiosError } from 'axios'

import axios from '../../../axiosConfig'
import Alert from '../../../components/Alert'
import Field from '../../../components/Field'
import Form from '../../../components/Form'
import { updatePasswordSchema } from '../../../schemas/userSchema'

type FormProps = z.infer<typeof updatePasswordSchema>

const UpdatePassword: React.FC = () => {
  const [security, setSecurity] = useState<boolean[]>([false, false])

  const [alert, setAlert] = useState<[boolean, string]>([false, ''])
  const [duration, setDuration] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const onSubmit = async (data: FormProps) => {
    try {
      const token = localStorage.getItem('passwordRecoveryToken')

      const request = await axios.post('/recover-password/update-password', {
        token,
        newPassword: data.newPassword,
      })

      if (request.data.status === 'success') {
        setAlert([true, request.data.message])
      }

      setTimeout(() => {
        reset()
        navigate('/signin')
        localStorage.removeItem('passwordRecoveryToken')
      }, 3000)
    } catch (err) {
      console.log(err)
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
    <div className="w-full h-screen flex absolute items-center justify-center">
      <Alert type={alert[0]} toggle={duration} message={alert[1]} />
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Header.Root>
          <Form.Header.Title>Redefina sua senha</Form.Header.Title>
          <Form.Header.Description>
            Esta senha deve ser diferente da senha anterior
          </Form.Header.Description>
        </Form.Header.Root>
        <Form.Content>
          <Field.Root errorMessage={errors.newPassword?.message}>
            <Field.Input
              {...register('newPassword')}
              type={security[0] ? 'text' : 'password'}
              placeholder="Insira sua senha"
            />
            <Field.Action
              toggle={security[0]}
              onClick={() => setSecurity([!security[0], security[1]])}
            />
          </Field.Root>
          <Field.Root errorMessage={errors.confirmNewPassword?.message}>
            <Field.Input
              {...register('confirmNewPassword')}
              type={security[1] ? 'text' : 'password'}
              placeholder="Confirme sua senha"
            />
            <Field.Action
              toggle={security[1]}
              onClick={() => setSecurity([security[0], !security[1]])}
            />
          </Field.Root>
        </Form.Content>
        <Form.Action>REDEFINIR SENHA</Form.Action>
        <Link to="/signin" className="text-sm text-[#6f6f6f]">
          Voltar para o login.
        </Link>
      </Form.Root>
    </div>
  )
}

export default UpdatePassword
