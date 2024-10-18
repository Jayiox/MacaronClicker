import React, { createContext, useReducer } from 'react';

export const GameContext = createContext();

const initialState = {
  user: null,
  macaronCount: 0,
  cursors: 0,
  allTimeMacarons: 0,
  cursorCost: 15,
  rollerCost: 100,
};

function macaronReducer(state, action) {
  switch (action.type) {
    case 'REGISTER_USER':
      const newUser = {
        username: action.payload.username,
        password: action.payload.password,
        macaronCount: state.macaronCount,
        cursors: state.cursors,
        allTimeMacarons: state.allTimeMacarons,
        cursorCost: state.cursorCost,
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      return {
        ...state,
        user: newUser,
      };
    case 'LOGIN_USER':
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser && savedUser.username === action.payload.username && savedUser.password === action.payload.password) {
        return {
          ...state,
          user: savedUser,
          macaronCount: savedUser.macaronCount || 0,
          cursors: savedUser.cursors || 0,
          allTimeMacarons: savedUser.allTimeMacarons || 0,
          cursorCost: savedUser.cursorCost || 15,
        };
      } else {
        console.error('Invalid username or password');
        return state;
      }
    case 'INCREMENT_MACARONS':
      const updatedState = {
        ...state,
        macaronCount: state.macaronCount + 1,
        allTimeMacarons: state.allTimeMacarons + 1,
      };
      if (state.user) {
        localStorage.setItem('user', JSON.stringify({ ...state.user, ...updatedState }));
      }
      return updatedState;
    case 'BUY_CURSOR':
      const nextCost = state.cursorCost + (state.cursors + 3);
      if (state.macaronCount >= state.cursorCost) {
        const updatedCursorState = {
          ...state,
          cursors: state.cursors + 1,
          macaronCount: state.macaronCount - state.cursorCost,
          cursorCost: nextCost,
        };
        if (state.user) {
          localStorage.setItem('user', JSON.stringify({ ...state.user, ...updatedCursorState }));
        }
        return updatedCursorState;
      }
      return state;
      case 'BUY_ROLLER':
  const rollerNextCost = state.rollerCost + (state.rollers + 50);
  if (state.macaronCount >= state.rollerCost) {
    const updatedRollerState = {
      ...state,
      rollers: state.rollers + 1,
      macaronCount: state.macaronCount - state.rollerCost,
      rollerCost: rollerNextCost,
    };
    if (state.user) {
      localStorage.setItem('user', JSON.stringify({ ...state.user, ...updatedRollerState }));
    }
    return updatedRollerState;
  }
  return state;
    case 'LOGOUT_USER':
      localStorage.setItem('user', JSON.stringify({ ...state.user, macaronCount: state.macaronCount, cursors: state.cursors, allTimeMacarons: state.allTimeMacarons, cursorCost: state.cursorCost }));
      return {
        ...state,
        user: null,
      };
    case 'WIPE_GAME':
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(macaronReducer, initialState);

  const registerUser = (username, password) => {
    const userData = {
      username,
      password,
      macaronCount: state.macaronCount,
      cursors: state.cursors,
      allTimeMacarons: state.allTimeMacarons,
      cursorCost: state.cursorCost,
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'REGISTER_USER', payload: userData });
  };

  const loginUser = (username, password) => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
  
    if (savedUser && savedUser.username === username && savedUser.password === password) {
      console.log('Login successful!');
      dispatch({ type: 'LOGIN_USER', payload: savedUser });
    } else {
      console.log('Invalid username or password');
    }
  };

  const logoutUser = () => {
    const savedUserData = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...savedUserData, username: savedUserData.username, password: savedUserData.password }));
    
    dispatch({ type: 'LOGOUT_USER' });
  };
  
  const wipeGame = () => {
    localStorage.clear();
    dispatch({ type: 'WIPE_GAME' });
    window.location.reload();
  };

  return (
    <GameContext.Provider value={{ ...state, dispatch, registerUser, loginUser, logoutUser, wipeGame }}>
      {children}
    </GameContext.Provider>
  );
};