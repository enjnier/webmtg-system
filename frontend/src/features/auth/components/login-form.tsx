import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'

export function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アカウントにログイン</CardTitle>
        <CardDescription>アカウントにログインするには、以下のメールアドレスを入力してください。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メール</Label>
            <Input id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">パスワード</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                パスワードをお忘れですか？
              </a>
            </div>
            <Input id="password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full">ログイン</Button>
        <Button variant="outline" className="w-full">
          Googleでログイン
        </Button>
        <div className="text-center mt-4 text-sm">
          アカウントをお持ちでないですか？{' '}
          <a href="#" className="text-primary hover:underline">
            サインアップ
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
