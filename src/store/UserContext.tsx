import { UserDto } from "@/dtos/user";
import React from "react";

export type Action =
  | {
      type: "Loading";
      payload: {
        isLoading: boolean;
      };
    }
  | {
      type: "Set";
      payload: {
        users: UserDto[];
      };
    }
  | {
      type: "Add";
      payload: {
        user: UserDto;
      };
    }
  | {
      type: "Update";
      payload: {
        user: UserDto;
      };
    }
  | {
      type: "Delete";
      payload: {
        userId: string;
      };
    };

export type State = {
  isLoading?: boolean;
  users: UserDto[];
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "Loading": {
      return {
        ...prevState,
        isLoading: action.payload.isLoading,
      };
    }
    case "Set": {
      return {
        ...prevState,
        users: action.payload.users,
        isLoading: false,
      };
    }
    case "Add": {
      return {
        ...prevState,
        users: [...prevState.users, action.payload.user],
      };
    }
    case "Update": {
      let updatedUser = action.payload.user;
      const updatedAllUsers = prevState.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });

      return {
        ...prevState,
        users: updatedAllUsers,
      };
    }
    case "Delete": {
      return {
        ...prevState,
        users: prevState.users.filter((user) => {
          return user.id !== action.payload.userId;
        }),
      };
    }
    default:
      return prevState;
  }
};

const initialState: State = {
  isLoading: true,
  users: [],
};

export const UserContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => 0,
});

export const UserContextProvider = (props: { children?: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
