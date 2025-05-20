import { useState } from 'react'
import { useAtom } from 'jotai'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { loginAtom } from '@/shared/atoms/auth'
import { loginApi } from '../api/auth.api'
import { loginFormSchema } from '../types/auth.schema'
import type { LoginForm as LoginFormType } from '../types/auth.schema'

interface LoginFormProps {
  onLoginSuccess?: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [, login] = useAtom(loginAtom)
  const [formData, setFormData] = useState<LoginFormType>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof LoginFormType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    try {
      loginFormSchema.assert(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {}

      if (error.problems) {
        error.problems.forEach((problem: any) => {
          const path = problem.path?.[0] || 'form'
          fieldErrors[path] = problem.message || 'Invalid input'
        })
      } else {
        fieldErrors.form = 'Invalid form data'
      }

      setErrors(fieldErrors)
      return false
    }
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const response = await loginApi(formData)

      if (response.success && response.data) {
        login(response.data.user, response.data.token)
        onLoginSuccess?.()
      } else {
        setErrors({ form: response.error || 'Login failed' })
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setErrors({ form: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アカウントにログイン</CardTitle>
        <CardDescription>アカウントにログインするには、以下のメールアドレスを入力してください。</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            {errors.form && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{errors.form}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">メール</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className={errors.email ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  パスワードをお忘れですか？
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className={errors.password ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </Button>
          <Button variant="outline" className="w-full" type="button" onClick={handleLogin} disabled={isLoading}>
            Googleでログイン
          </Button>
          <div className="text-center mt-4 text-sm">
            アカウントをお持ちでないですか？{' '}
            <a href="#" className="text-primary hover:underline">
              新規登録
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
