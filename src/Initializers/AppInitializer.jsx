import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getUserProfile} from "../store/slices/userSlice";

export default function AppInitializer() {

  const dispatch = useDispatch();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {
      dispatch(getUserProfile());
    }

  }, [dispatch]);

  return null;
}