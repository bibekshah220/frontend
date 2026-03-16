import { createContext, useState, useContext } from 'react';
import api from '../service/api';
import { API_ENDPOINTS } from '../utils/constants';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSession = async (sessionData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post(API_ENDPOINTS.SESSION.CREATE, sessionData);
      setSession(response.data.data);
      return { success: true, session: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const joinSession = async (sessionCode) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post(API_ENDPOINTS.SESSION.JOIN, { sessionCode });
      setSession(response.data.data);
      return { success: true, session: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to join session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    try {
      setError(null);
      setLoading(true);
      await api.post(API_ENDPOINTS.SESSION.END);
      setSession(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to end session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const leaveSession = async () => {
    try {
      setError(null);
      setLoading(true);
      await api.post(API_ENDPOINTS.SESSION.LEAVE);
      setSession(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to leave session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getSession = async (sessionId) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.get(`${API_ENDPOINTS.SESSION.GET}/${sessionId}`);
      setSession(response.data.data);
      return { success: true, session: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to get session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    setSession(null);
    setError(null);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        loading,
        error,
        createSession,
        joinSession,
        endSession,
        leaveSession,
        getSession,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionContext;
