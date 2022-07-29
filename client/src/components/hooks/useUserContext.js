import { useContext } from "react";
import UserContext from '../utils/userContext';

const useUserContext = () => {
  return useContext(UserContext);
}

export default useUserContext;