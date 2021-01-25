import {useState, useCallback, useEffect} from 'react'

const storageName = 'useData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, uid) => {
    setToken(jwtToken);
    setUserId(uid);

    localStorage.setItem(storageName, JSON.stringify({
      userId: uid,
      token: jwtToken,
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(storageName));

    if (userData && userData.token) {
      login(userData.token, userData.userId);
    }

    setReady(true);
  }, [login])

  return {login, logout, token, ready, userId}
} 