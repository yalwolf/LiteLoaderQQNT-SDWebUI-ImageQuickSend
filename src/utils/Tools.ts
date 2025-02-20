import { Group, MessageChain, MessageSource, PlainText, Image } from '../../liteloaderqqnt-euphony/src/index'
import { log } from './log';

interface MessageRecord {
    messageSource: MessageSource;
    timer: NodeJS.Timeout;
}

class Tools {
    private static messageRecords: Map<number, MessageRecord> = new Map();
    private static recordId = 0;

    static sendGroupMessage = async (
        groupId: number,
        message: string,
        timeoutSeconds: number = 10  // 默认10秒
    ): Promise<MessageSource> => {
        const group = Group.make(groupId);
        const msgSource = await group.sendMessage(
            new MessageChain().append(new PlainText(message))
        );
        
        // 秒转毫秒
        const timer = setTimeout(async () => {
            try {
                await msgSource.recall();
                log(`消息已撤回 [群组 ${groupId}] (${timeoutSeconds}秒)`);
                this.messageRecords.delete(recordId);
            } catch (error) {
                log(`撤回失败 [群组 ${groupId}]:`, error);
            }
        }, timeoutSeconds * 1000);  // 转换秒到毫秒

        const recordId = ++this.recordId;
        this.messageRecords.set(recordId, { messageSource: msgSource, timer });
        return msgSource;
    }

    static sendGroupImageMessage = async (
        groupId: number,
        imgPath: string,
        timeoutSeconds: number = 10  // 默认10秒
    ): Promise<MessageSource> => {
        const group = Group.make(groupId);
        const msgSource = await group.sendMessage(
            new MessageChain().append(new Image(imgPath))
        );
        
        // 秒转毫秒
        const timer = setTimeout(async () => {
            try {
                await msgSource.recall();
                log(`图片已撤回 [群组 ${groupId}] (${timeoutSeconds}秒)`);
                this.messageRecords.delete(recordId);
            } catch (error) {
                log(`图片撤回失败 [群组 ${groupId}]:`, error);
            }
        }, timeoutSeconds * 1000);  // 转换秒到毫秒

        const recordId = ++this.recordId;
        this.messageRecords.set(recordId, { messageSource: msgSource, timer });
        return msgSource;
    }
}
export default Tools;
