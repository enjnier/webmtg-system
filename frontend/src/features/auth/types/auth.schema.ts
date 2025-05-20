import { type } from "arktype"
import { userSchema } from "../../dashboard/types/dashboard.schema"

// ログインフォームデータ型
export const loginFormSchema = type({
  email: "string.email",
  password: "string"
})

// ログインレスポンス型
export const loginResponseSchema = type({
  success: "boolean",
  "data?": {
    user: userSchema,
    token: "string"
  },
  "message?": "string",
  "error?": "string"
})

// 型の推論
export type LoginForm = typeof loginFormSchema.infer
export type LoginResponse = typeof loginResponseSchema.infer
