import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import { history } from '@umijs/max';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <div className={styles.container}>
        <Card
          hoverable
          className={styles.card}
          onClick={() => history.push('/converter')}
        >
          <Title level={3}>MangoFix 代码转换器</Title>
          <Paragraph>
            快速将 Objective-C 代码转换为 Mango 热修复代码的在线工具
          </Paragraph>
        </Card>
      </div>
    </PageContainer>
  );
};

export default HomePage;
