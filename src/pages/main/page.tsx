import { List } from '@refinedev/antd';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, []);

  return (
    <List title="Dashboard">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {error && (
            <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>
          )}
          Hello!
        </>
      )}
    </List>
  );
};
