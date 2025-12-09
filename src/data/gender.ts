// 1. 코드 형태 (약어)
export const GENDER_CODE = ['M', 'F'] as const;

// 2. 영문 표기
export const GENDER_ENGLISH = ['Male', 'Female'] as const;

// 3. 한글 한 글자 (약어)
export const GENDER_KOREAN_SHORT = ['남', '여'] as const;

// 4. 한글 일반 (일상적인 표현)
export const GENDER_KOREAN_COMMON = ['남자', '여자'] as const;

// 5. 한글 격식 (문서, 서류 등)
export const GENDER_KOREAN_FORMAL = ['남성', '여성'] as const;
