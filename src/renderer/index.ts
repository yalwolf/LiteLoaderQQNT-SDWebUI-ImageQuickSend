import { log } from '../utils/log';
import Tools from '../utils/Tools';


log('加载完毕');

// Tools.sendGroupMessage(728868594, '测试发送2')
// Tools.sendGroupImageMessage(728868594, 'C:\\Users\\Y_ALA\\Downloads\\e3014953c45327e5bf75129401a2e06f5ae7adcb.jpg', 5)

export const onSettingWindowCreated = async (view: HTMLElement) => {
  // @ts-expect-error: 该第三方库类型定义不完整，需要强制调用
  const plugin_path = LiteLoader.plugins.LiteLoaderQQNT_SDWebUI_ImageQuickSend.path.plugin;
  const pages_path = `local:///${plugin_path}/pages/settings.html`;
  view.innerHTML = await (await fetch(pages_path)).text();

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    // @ts-expect-error: 该第三方库类型定义不完整，需要强制调用
    LiteLoader.api.openExternal('https://github.com/yalwolf/LiteLoaderQQNT-SDWebUI-ImageQuickSend');
  });
};