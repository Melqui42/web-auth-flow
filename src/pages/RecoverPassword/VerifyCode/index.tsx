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
import { verifyCodeSchema } from '../../../schemas/userSchema'

type FormProps = z.infer<typeof verifyCodeSchema>

const VerifyCode: React.FC = () => {
  const [alert, setAlert] = useState<[boolean, string]>([false, ''])
  const [duration, setDuration] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    resolver: zodResolver(verifyCodeSchema),
  })

  const onSubmit = async (data: FormProps) => {
    try {
      const code =
        data.camp1 + data.camp2 + data.camp3 + data.camp4 + data.camp5

      const token = localStorage.getItem('passwordRecoveryToken')

      const request = await axios.post('/recover-password/verify-code', {
        token,
        code,
      })

      localStorage.setItem('passwordRecoveryToken', request.data.details.token)

      if (request.data.status === 'success') {
        setAlert([true, request.data.message])
      }

      setTimeout(() => {
        reset()
        navigate('/recover-password/update-password')
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
    <div className="w-full h-screen flex absolute items-center justify-center">
      <Alert type={alert[0]} toggle={duration} message={alert[1]} />
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Header.Root>
          <Form.Header.Title>Esqueci minha senha</Form.Header.Title>
          <Form.Header.Description>
            Enviamos o código para o seu email
          </Form.Header.Description>
        </Form.Header.Root>
        <Form.Content custom="flex-row">
          <Field.Root
            custom="w-[55px] px-8"
            errorMessage={errors.camp1?.message}
            errorToggle={false}
          >
            <Field.Input
              {...register('camp1')}
              type="text"
              maxLength={1}
              placeholder="0"
              custom="w-2"
            />
          </Field.Root>
          <Field.Root
            custom="w-[55px] px-8"
            errorMessage={errors.camp2?.message}
            errorToggle={false}
          >
            <Field.Input
              {...register('camp2')}
              type="text"
              maxLength={1}
              placeholder="0"
              custom="w-2"
            />
          </Field.Root>
          <Field.Root
            custom="w-[55px] px-8"
            errorMessage={errors.camp3?.message}
            errorToggle={false}
          >
            <Field.Input
              {...register('camp3')}
              type="text"
              maxLength={1}
              placeholder="0"
              custom="w-2"
            />
          </Field.Root>
          <Field.Root
            custom="w-[55px] px-8"
            errorMessage={errors.camp4?.message}
            errorToggle={false}
          >
            <Field.Input
              {...register('camp4')}
              type="text"
              maxLength={1}
              placeholder="0"
              custom="w-2"
            />
          </Field.Root>
          <Field.Root
            custom="w-[55px] px-8"
            errorMessage={errors.camp5?.message}
            errorToggle={false}
          >
            <Field.Input
              {...register('camp5')}
              type="text"
              maxLength={1}
              placeholder="0"
              custom="w-2"
            />
          </Field.Root>
        </Form.Content>
        <Form.Action>CONTINUAR</Form.Action>
        <Link to="/signin" className="text-sm text-[#6f6f6f]">
          Voltar para o login.
        </Link>
      </Form.Root>
    </div>
  )
}

export default VerifyCode
