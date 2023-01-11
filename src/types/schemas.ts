import { z } from 'zod'

export const HeaderItemSchema = z.object({
  field: z
    .object({
      name: z.string(),
      value: z.string()
    })
    .optional(),
  fontSize: z.number().optional(),
  color: z.string().min(6).optional(),
  avatar: z.string().optional()
})

export const headerSchema = z.array(HeaderItemSchema)

export type HeaderType = z.infer<typeof headerSchema>
export type HeaderItemType = z.infer<typeof HeaderItemSchema>
