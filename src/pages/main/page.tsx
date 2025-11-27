import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph, Text } = Typography;

export const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        position: 'relative',
      }}>
      {error && (
        <Text type="danger" style={{ position: 'absolute', top: 32 }}>
          {error}
        </Text>
      )}
      <Typography style={{ textAlign: 'center', maxWidth: 520 }}>
        <Title level={2} style={{ marginBottom: 12 }}>
          Welcome to AI Agent Graph Platform
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 0 }}>
          Select "Graphs" from the sidebar to view your agent graphs.
        </Paragraph>
      </Typography>
    </div>
  );
};
