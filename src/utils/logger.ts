export const logger = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️ ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  success: (message: string, data?: any) => {
    console.log(`✅ ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  warning: (message: string, data?: any) => {
    console.log(`⚠️ ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  error: (message: string, error?: any) => {
    console.error(`❌ ${message}`, error || '');
  },
  debug: (message: string, data?: any) => {
    console.log(`🔍 ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  db: (message: string, data?: any) => {
    console.log(`🗄️ ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  api: (message: string, data?: any) => {
    console.log(`🌐 ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  time: (message: string, data?: any) => {
    console.log(`⏱️ ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
};