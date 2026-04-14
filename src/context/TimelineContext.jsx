import { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TimelineContext = createContext();

const timelineReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, { ...action.payload, id: Date.now() + Math.random() }];
    case 'SET_EVENTS':
      return action.payload;
    default:
      return state;
  }
};

export function TimelineProvider({ children }) {
  const [storedEvents, setStoredEvents] = useLocalStorage('keenkeeper_timeline', []);
  const [events, dispatch] = useReducer(timelineReducer, storedEvents);

  useEffect(() => {
    setStoredEvents(events);
  }, [events, setStoredEvents]);

  const addEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  return (
    <TimelineContext.Provider value={{ events, addEvent }}>
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) throw new Error('useTimeline must be used within TimelineProvider');
  return context;
};