import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readLocalStorageValue } from '@mantine/hooks';
import Welcome from '@/components/Welcome/Welcome';

export default function WelcomePage() {
  const navigate = useNavigate();

  // If user_name exists in localStorage, then we redirect to home page
  const name = readLocalStorageValue({ key: 'user_name' });

  useEffect(() => {
    if (name) {
      navigate('/');
    }
  }, [name]);

  return <Welcome />;
}
