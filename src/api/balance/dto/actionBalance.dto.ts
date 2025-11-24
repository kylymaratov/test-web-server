import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator'
import { TBalanceAction } from 'src/@types/balance/balance.types'

export class ActionBalanceDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Amount must be integer type' })
  @Min(1, { message: 'Amount must be greater than 0' })
  changeAmount: number

  @IsNotEmpty()
  @IsEnum(TBalanceAction)
  action: TBalanceAction
}
