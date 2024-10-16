import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readLocalStorageValue } from '@mantine/hooks';

export default function HomePage() {
  const userName = readLocalStorageValue({ key: 'user_name' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate('/welcome', { replace: true });
    }
  }, [userName]);

  return (
    <>
      <h1>Homepage</h1>
    </>
  );
}
