import type { Language } from '@/types/default';

export const AlertMessages: Record<string, Record<Language, string>> = {
  // 공통
  WARNING_TITLE: {
    en: 'Warning',
    ko: '경고',
  },
  CONFIRM_DELETE_DESCRIPTION: {
    en: 'Are you sure you want to delete it?\nIt cannot be recovered after deleting it.',
    ko: '정말 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.',
  },
  // 인증메일
  SUCCESS_EMAIL_SENT: {
    en: 'The authentication mail has been sent well.',
    ko: '인증 메일이 성공적으로 전송되었습니다.',
  },
  FAIL_EMAIL_SENT: {
    en: 'Failed to send the authentication mail.',
    ko: '인증 메일 전송에 실패하였습니다.',
  },
  // 이메일 입력 필수
  REQUIRED_EMAIL_INPUT: {
    en: 'Please enter your email.',
    ko: '이메일을 입력해주세요.',
  },
  NOT_EMAIL_FORMAT: {
    en: 'Please check your email format.',
    ko: '이메일 형식을 확인해주세요.',
  },
  // 로그인 실패
  LOGIN_FAILED: {
    en: 'Login failed. Please check your email and password.',
    ko: '로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.',
  },
  // 비밀번호 입력 필수
  REQUIRED_PASSWORD_INPUT: {
    en: 'Please enter your password.',
    ko: '비밀번호를 입력해주세요.',
  },
  // 비밀번호 변경
  SUCCESS_PASSWORD_CHANGED: {
    en: 'Your password has been changed successfully.\nPlease log in again.',
    ko: '비밀번호가 성공적으로 변경되었습니다.\n다시 로그인해주세요.',
  },
  FAIL_PASSWORD_CHANGED: {
    en: 'Failed to change your password.',
    ko: '비밀번호 변경에 실패하였습니다.',
  },
  // 프로젝트 생성
  SUCCESS_PROJECT_CREATED: {
    en: 'The project has been created successfully.',
    ko: '프로젝트가 성공적으로 생성되었습니다.',
  },
  FAIL_PROJECT_CREATED: {
    en: 'Failed to create the project.',
    ko: '프로젝트 생성에 실패하였습니다.',
  },
  REQUIRED_PROJECT_NAME_INPUT: {
    en: 'Please enter the project name.',
    ko: '프로젝트 이름을 입력해주세요.',
  },
  DUPLICATE_PROJECT_NAME: {
    en: 'A project with the same name already exists.\nPlease choose a different name.',
    ko: '동일한 이름의 프로젝트가 이미 존재합니다.\n다른 이름을 선택해주세요.',
  },
  // 프로젝트 수정
  SUCCESS_PROJECT_UPDATED: {
    en: 'The project has been updated successfully.',
    ko: '프로젝트가 성공적으로 수정되었습니다.',
  },
  FAIL_PROJECT_UPDATED: {
    en: 'Failed to update the project.',
    ko: '프로젝트 수정에 실패하였습니다.',
  },
  // 프로젝트 삭제
  SUCCESS_PROJECT_DELETED: {
    en: 'The project has been deleted successfully.',
    ko: '프로젝트가 성공적으로 삭제되었습니다.',
  },
  FAIL_PROJECT_DELETED: {
    en: 'Failed to delete the project.',
    ko: '프로젝트 삭제에 실패하였습니다.',
  },
  CONFIRM_DELETE_PROJECT_TITLE: {
    en: 'Delete Project',
    ko: '프로젝트 삭제',
  },
  CONFIRM_DELETE_PROJECT_DESCRIPTION: {
    en: 'Are you sure you want to delete this project?\nAll data related to this project will be deleted and cannot be recovered.',
    ko: '정말 이 프로젝트를 삭제하시겠습니까?\n이 프로젝트와 관련된 모든 데이터가 삭제되며 복구할 수 없습니다.',
  },
  // 컬럼 생성
  SUCCESS_COLUMN_CREATED: {
    en: 'The column has been created successfully.',
    ko: '컬럼이 성공적으로 생성되었습니다.',
  },
  FAIL_COLUMN_CREATED: {
    en: 'Failed to create the column.',
    ko: '컬럼 생성에 실패하였습니다.',
  },
  // 컬럼 수정
  SUCCESS_COLUMN_UPDATED: {
    en: 'The column has been updated successfully.',
    ko: '컬럼이 성공적으로 수정되었습니다.',
  },
  FAIL_COLUMN_UPDATED: {
    en: 'Failed to update the column.',
    ko: '컬럼 수정에 실패하였습니다.',
  },
  // 컬럼 삭제
  SUCCESS_COLUMN_DELETED: {
    en: 'The column has been deleted successfully.',
    ko: '컬럼이 성공적으로 삭제되었습니다.',
  },
  FAIL_COLUMN_DELETED: {
    en: 'Failed to delete the column.',
    ko: '컬럼 삭제에 실패하였습니다.',
  },
  // 컬럼 옵션 오류
  REQUIRED_COLUMN_NAME_INPUT: {
    en: 'Please enter the column name.',
    ko: '컬럼 이름을 입력해주세요.',
  },
  REQUIRED_COLUMN_TYPE_INPUT: {
    en: 'Please select the column type.',
    ko: '컬럼 타입을 선택해주세요.',
  },
  UNIQUE_PRIMARY_KEY_COLUMN: {
    en: 'There can be only one primary key column in a table.',
    ko: '테이블에는 하나의 기본 키 컬럼만 있을 수 있습니다.',
  },
  UNIQUE_COLUMN_NAME: {
    en: 'Column names must be unique within a table.',
    ko: '컬럼 이름은 테이블 내에서 고유해야 합니다.',
  },

  // 컬럼 유효성 검사
  SUCCESS: {
    en: 'Success',
    ko: '성공',
  },
  FAIL: {
    en: 'Fail',
    ko: '실패',
  },
  DEFAULT_FAIL_MESSAGE: {
    en: 'The column options are invalid.',
    ko: '컬럼 옵션이 유효하지 않습니다.',
  },
  INPUT_MINIMUM_VALUE: {
    en: 'Please enter the minimum value.',
    ko: '최소값을 입력해주세요.',
  },
  MINIMUM_GREATER_MAXIMUM: {
    en: 'The minimum value is greater than the maximum value.',
    ko: '최소값이 최대값보다 큽니다.',
  },
  INPUT_MINIMUM_DATE: {
    en: 'Please enter the minimum date.',
    ko: '최소 날짜를 입력해주세요.',
  },
  MINIMUM_DATE_GREATER_MAXIMUM_DATE: {
    en: 'The minimum date is greater than the maximum date.',
    ko: '최소 날짜가 최대 날짜보다 늦습니다.',
  },
  SELECT_COLUMN_OPTION_TYPE: {
    en: 'Please select the column option type.',
    ko: '컬럼 옵션 타입을 선택해주세요.',
  },
  REQUIRED_ONE_OPTION_VALUE: {
    en: 'Please enter at least one option value.',
    ko: '옵션 값을 최소 하나 이상 입력해주세요.',
  },
  REQUIRED_ENUM_OPTION_VALUE: {
    en: 'Please enter the enum option values.',
    ko: '열거형 옵션 값을 입력해주세요.',
  },
  DUPLICATE_ENUM_OPTION_VALUE: {
    en: 'Duplicate value exists. Enum option values must be unique.',
    ko: '중복된 값이 존재합니다. 열거형 옵션 값은 고유해야 합니다.',
  },
  // 목 데이터 생성
  REQUIRED_INPUT_MOCK_DATA_AMOUNT: {
    en: 'Please enter as many as you want to create.',
    ko: '생성할 개수를 입력해주세요.',
  },
  // 회원가입
  FAIL_SIGN_UP: {
    en: 'Failed to sign up. Please try again.',
    ko: '회원가입에 실패하였습니다. 다시 시도해주세요.',
  },
  REQUIRED_NICKNAME_INPUT: {
    en: 'Please enter your nickname.',
    ko: '닉네임을 입력해주세요.',
  },
  NOT_PASSWORD_FORMAT: {
    en: 'Password must include uppercase, lowercase, number,\nand a special character (!, @, #, $, %, ^, (, ), &).',
    ko: '비밀번호는 대문자, 소문자, 숫자 및\n특수문자(!, @, #, $, %, ^, (, ), &)를 포함해야 합니다.',
  },
  REQUIRED_RE_PASSWORD_INPUT: {
    en: 'Please enter your re-password.',
    ko: '비밀번호 확인을 입력해주세요.',
  },
  NOT_MATCH_PASSWORD: {
    en: 'Password does not match. Please check again.',
    ko: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
  },
  // 회원전용
  MEMBERS_ONLY_ACCESS: {
    en: 'This service is for members only.\nPlease sign in to use this service.',
    ko: '이 서비스는 회원 전용입니다.\n로그인 후 이용해주세요.',
  },
};
