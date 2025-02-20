const hexToAnsi = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `\x1b[38;2;${r};${g};${b}m`;
}
const pluginname = hexToAnsi('#87CEEB') + '[SD图片快捷发送服务] ' + '\x1b[0m';
export const log = (...args: unknown[]) => {
  console.log(pluginname, ...args);
};

export const err = (...args: unknown[]) => {
  console.error(pluginname, ...args);
};
