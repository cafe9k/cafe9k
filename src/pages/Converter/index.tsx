import { PageContainer } from '@ant-design/pro-components';
import { Button, Input, Space, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const { TextArea } = Input;

const sampleCode = `@implementation SampleClass
- (void)requestUrl:(NSString *)url param:(NSDictionary *)dict callback:(JPCallback)callback {
    [super requestUrl:url param:dict callback:callback];
    JPRequest *obj = [[JPRequest alloc] initWithUrl:url param:dict];
    obj.successBlock = ^(id data, NSError *err) {
        NSString *content = [JPParser parseData:data];
        [self.dataSource refresh];
        self.handleRequestSuccess(@{
            @"content": content
        });
    };
}
@end`;

const ConverterPage: React.FC = () => {
  const [objcCode, setObjcCode] = useState<string>(sampleCode);
  const [mangoCode, setMangoCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const handleConvert = async () => {
    if (objcCode.split('\n').length > 1000) {
      message.error('超过限制，转换内容支持1000行以下。');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://ackjs.vercel.app/convertCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: objcCode }),
      });
      
      const data = await response.json();
      
      setMangoCode(data.code);
      setErrors(data.errors || []);
      setWarnings(data.warnings || []);

      if (data.errors?.length) {
        message.error('转换过程中存在错误，请查看提示');
      } else if (data.warnings?.length) {
        message.warning('转换完成，但存在一些警告');
      } else {
        message.success('转换成功');
      }
    } catch (error) {
      message.error('转换失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="MangoFix代码转换器"
      subTitle={
        <a href="https://github.com/YPLiang19/Mango" target="_blank" rel="noopener noreferrer">
          Mango
        </a>
      }
    >
      <div className={styles.container}>
        <div className={styles.codeArea}>
          <div className={styles.codeBox}>
            <h3>Objective-C 代码</h3>
            <TextArea
              value={objcCode}
              onChange={(e) => setObjcCode(e.target.value)}
              className={styles.textarea}
              placeholder="请输入 Objective-C 代码"
              rows={20}
            />
            {errors.map((error, index) => (
              <div key={index} className={styles.error}>
                {error}
              </div>
            ))}
          </div>
          
          <div className={styles.codeBox}>
            <h3>Mango 代码</h3>
            <TextArea
              value={mangoCode}
              readOnly
              className={styles.textarea}
              placeholder="转换后的 Mango 代码将显示在这里"
              rows={20}
            />
            {warnings.map((warning, index) => (
              <div key={index} className={styles.warning}>
                {warning}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="primary" onClick={handleConvert} loading={loading}>
            转换
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ConverterPage; 
