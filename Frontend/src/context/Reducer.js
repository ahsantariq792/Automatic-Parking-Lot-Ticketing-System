export const reducer = (state, action) => {
    switch (action.type) {
  
      case "USER_LOGIN": {
        if (
          action.payload.numberplate &&
          action.payload.arrival_time &&
          action.payload.deptime &&
          action.payload.carparkedtime &&
          action.payload.totalAmount 

          ) {
  
          return { ...state, user: action.payload }
  
        } else {
          console.log(`invalid data in USER_LOGIN reducer `);
          return state;
        }
      }
      case "USER_LOGOUT": {
        return { ...state, user: null } // set this to null on purpose, do not change
      }
      case "TOGGLE_THEME": {
        return { ...state, darkTheme: !state.darkTheme } // set this to null on purpose, do not change
      }
  
  
      default: {
        return state
      }
    }
  }