import { HttpErrorResponse } from '@angular/common/http';
import { AppError, AppErrorCode } from './common-model';

export function mapHttpError(error: HttpErrorResponse): AppError {
  switch (error.status) {
    case 0:
      return {
        code: AppErrorCode.NETWORK_ERROR,
        message: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
        status: error.status,
        details: error,
      };

    case 400:
      return {
        code: AppErrorCode.VALIDATION_ERROR,
        message: 'ข้อมูลไม่ถูกต้อง',
        status: error.status,
        details: error.error,
      };

    case 401:
      return {
        code: AppErrorCode.INVALID_CREDENTIALS,
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        status: error.status,
        details: error.error,
      };

    case 403:
      return {
        code: AppErrorCode.FORBIDDEN,
        message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
        status: error.status,
        details: error.error,
      };

    case 404:
      return {
        code: AppErrorCode.NOT_FOUND,
        message: 'ไม่พบข้อมูลที่ต้องการ',
        status: error.status,
        details: error.error,
      };

    case 500:
      return {
        code: AppErrorCode.SERVER_ERROR,
        message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
        status: error.status,
        details: error.error,
      };

    default:
      return {
        code: AppErrorCode.UNKNOWN_ERROR,
        message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
        status: error.status,
        details: error.error,
      };
  }
}
