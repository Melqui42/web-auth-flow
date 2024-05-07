import { z } from 'zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { AxiosError } from 'axios'
import axios from '../../axiosConfig'

import Alert from '../../components/Alert'
import Field from '../../components/Field'
import Form from '../../components/Form'
import { createSchema } from '../../schemas/userSchema'

type FormProps = z.infer<typeof createSchema>

const SignUp: React.FC = () => {
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
    resolver: zodResolver(createSchema),
  })

  const onSubmit = async (data: FormProps) => {
    try {
      const request = await axios.post('/signup', data)

      if (request.data.status === 'success') {
        setAlert([true, request.data.message])
      }

      setTimeout(() => {
        reset()
        navigate('/signin')
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
    <div className="w-full h-screen absolute flex flex-col items-center justify-center">
      <Alert type={alert[0]} toggle={duration} message={alert[1]} />
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Header.Root>
          <Form.Header.Title>Crie a sua conta aqui</Form.Header.Title>
          <Form.Header.Description>
            Vamos começar com seu sinal grátis de 30 dias.
          </Form.Header.Description>
        </Form.Header.Root>
        <Form.Content>
          <Field.Root errorMessage={errors.name?.message}>
            <Field.Input
              {...register('name')}
              type="text"
              placeholder="Insira seu nome completo"
            />
          </Field.Root>
          <Field.Root errorMessage={errors.email?.message}>
            <Field.Input
              {...register('email')}
              type="text"
              placeholder="Insira seu e-mail"
            />
          </Field.Root>
          <Field.Root errorMessage={errors.password?.message}>
            <Field.Input
              {...register('password')}
              type={security[0] ? 'text' : 'password'}
              placeholder="Insira sua senha"
            />
            <Field.Action
              toggle={security[0]}
              onClick={() => setSecurity([!security[0], security[1]])}
            />
          </Field.Root>
          <Field.Root errorMessage={errors.confirmPassword?.message}>
            <Field.Input
              {...register('confirmPassword')}
              type={security[1] ? 'text' : 'password'}
              placeholder="Confirme sua senha"
            />
            <Field.Action
              toggle={security[1]}
              onClick={() => setSecurity([security[0], !security[1]])}
            />
          </Field.Root>
        </Form.Content>
        <Form.Action>CONTINUAR</Form.Action>
        <div className="w-full flex items-center justify-center gap-2 text-sm text-[#6f6f6f]">
          <div className="w-8 h-px bg-[#6f6f6f]"></div>Ou conecte-se com
          <div className="w-8 h-px bg-[#6f6f6f]"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-4 h-10 text-sm font-medium text-[#6f6f6f] border border-[#9B9A9A] shadow-gray rounded-lg">
          <img
            src={require('../../assets/google.png')}
            alt=""
            className="w-5"
          />
          Conecte-se com Google
        </button>
        <Link to="/signin" className="text-sm text-[#6f6f6f]">
          Já tem uma conta?{' '}
          <span className="font-bold hover:text-[#2d2d2d] underline transition-colors duration-500">
            Conecte-se.
          </span>
        </Link>
      </Form.Root>
    </div>
  )
}

export default SignUp
