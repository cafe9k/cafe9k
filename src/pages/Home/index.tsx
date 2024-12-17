import { history } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>UmiMax Demo</h1>
        <p className={styles.description}>
          企业级前端开发框架，可扩展的插件体系，以及完善的工程化能力
        </p>
        <div className={styles.actions}>
          <Button
            type="primary"
            size="large"
            onClick={() => history.push('/docs/getting-started')}
          >
            开始使用
          </Button>
          <Button
            size="large"
            onClick={() => window.open('https://github.com/umijs/umi')}
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>开箱即用</h3>
          <p>内置了路由、构建、部署、测试等，仅需一个依赖即可上手开发。</p>
        </div>
        <div className={styles.feature}>
          <h3>面向企业级</h3>
          <p>经过大量企业级项目的验证，确保框架的稳定性和可靠性。</p>
        </div>
        <div className={styles.feature}>
          <h3>插件化</h3>
          <p>可扩展的插件系统，让框架可以生长，更好地满足业务需求。</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
