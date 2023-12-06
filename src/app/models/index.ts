/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorInfo {
  method?: string;
  url?: string;
  queryParams?: string;
  ip?: string;
  user?: string;
  type?:
    | "APP_ERROR"
    | "DATA_NOT_FOUND"
    | "DATA_ERROR"
    | "VALIDATION_ERROR"
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "FORBIDDEN";
  error?: string;
  error_description?: string[];
}

export interface ChangeAccountDto {
  name?: string;
}

export interface CreateDepositDto {
  /** @format int64 */
  account_id?: number;
  term?: "MONTH_3" | "MONTH_6" | "MONTH_12" | "PERPETUAL";
  /** @format double */
  amount?: number;
  deposit_type?: "REVOCABLE" | "IRREVOCABLE";
}

export interface CreateCreditDto {
  name?: string;
  /** @format int64 */
  account_id?: number;
  term?: "MONTH_3" | "MONTH_6" | "MONTH_12";
  payment_type?: "AUTO" | "MANUAL";
  /** @format double */
  amount_given?: number;
  is_notification_enabled?: boolean;
}

export interface MakePaymentRequest {
  /** @format double */
  sum_to_pay?: number;
}

export interface CreateAccountDto {
  name?: string;
  currency?: string;
}

export interface TransferRequest {
  /** @format int64 */
  sender_id?: number;
  /** @format int64 */
  receiver_id?: number;
  /** @format double */
  sum?: number;
  currency?: string;
}

export interface ResetUserPasswordRequest {
  password: string;
  password_confirmation: string;
}

export interface RegisterUserRequest {
  password?: string;
  /**
   * @minLength 0
   * @maxLength 90
   */
  full_name: string;
  /**
   * @minLength 0
   * @maxLength 320
   */
  email: string;
  /**
   * @minLength 12
   * @maxLength 14
   */
  phone_number: string;
  is_enabled?: boolean;
  two_factor_auth?: boolean;
}

export interface Login {
  login?: string;
  password?: string;
}

export interface JwtToken {
  token?: string;
  /** @format date-time */
  otpExpiration?: string;
}

export interface ConfirmOtpRequest {
  /** @format int32 */
  otp_code: number;
}

export interface Deposit {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  date?: string;
  term?: "MONTH_3" | "MONTH_6" | "MONTH_12" | "PERPETUAL";
  /** @format double */
  amount?: number;
  /** @format double */
  compensationAmount?: number;
  status?: "NEW" | "APPROVED" | "ONCOMPENSATION" | "CLOSED";
  type?: "REVOCABLE" | "IRREVOCABLE";
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  accountId?: number;
  /** @format date-time */
  endDate?: string;
}

export interface Credit {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format date-time */
  date?: string;
  /** @format int64 */
  user_id?: number;
  /** @format int64 */
  account_id?: number;
  term?: "MONTH_3" | "MONTH_6" | "MONTH_12";
  /** @format double */
  amount_given?: number;
  /** @format double */
  debt?: number;
  /** @format date-time */
  next_pay_date?: string;
  /** @format double */
  per_month_pay_sum?: number;
  /** @format double */
  penya?: number;
  status?: "NEW" | "APPROVED" | "PAID";
  payment_type?: "AUTO" | "MANUAL";
  is_notification_enabled?: boolean;
  is_need_manual_payment?: boolean;
  email_for_notification?: string;
}

export interface CreditPaymentInfoDto {
  credit_name?: string;
  /** @format int64 */
  credit_id?: number;
  /** @format double */
  sum_per_month?: number;
  /** @format double */
  penya?: number;
  /** @format double */
  debt_after_payment?: number;
  /** @format double */
  sum_to_pay?: number;
}

export interface Account {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format date-time */
  date?: string;
  /** @format int64 */
  user_id?: number;
  /** @format double */
  balance?: number;
  currency?: string;
  is_blocked?: boolean;
}

export interface SetNewPasswordUsingLinkParams {
  expiryToken: string;
}

export interface ChangeCreditStatusParams {
  credit_status: "NEW" | "APPROVED" | "PAID";
  /** @format int64 */
  creditId: number;
  userId: string;
}

export interface ChangeAccountStatusParams {
  is_blocked: boolean;
  /** @format int64 */
  accountId: number;
  userId: string;
}

export interface SendEmailWithExpiryTokenParams {
  email: string;
}
