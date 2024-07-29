// 初始化阿里云 OSS 实例
import OSS from 'ali-oss';

export const ossClient = new OSS({
    accessKeyId: 'LTAI5tJFV5Gm3uq3Kd9h7nPH',
    accessKeySecret: 'JY3T30c6dwTqjtK1Qg7EXsoOMxnbk0',
    bucket: 'onbotics-map-img',
    endpoint: 'https://oss-cn-shanghai.aliyuncs.com'
});

// 生成随机文件名
export function generateRandomFileName(extension:any) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const randomString = Math.random().toString(36).substring(2, 15);
    const randomString2 = Math.random().toString(36).substring(2, 15);
    return `uploads/${year}${month}${day}/${randomString}${randomString2}.${extension}`;

}
