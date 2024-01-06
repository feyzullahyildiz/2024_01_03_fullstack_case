import { useAppSelector } from "../redux/hooks";

export const useUser = () => useAppSelector((state) => state.me.user)!;
