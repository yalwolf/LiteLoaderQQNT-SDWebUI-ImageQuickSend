export const log = (...args: unknown[]) => {
  console.log('[SD图片快捷发送服务]', ...args);
};

export const err = (...args: unknown[]) => {
  console.error('[SD图片快捷发送服务]', ...args);
};
