import { loginState } from "@/storage/atom";
import { useRecoilValue } from "recoil";

export default function AlarmSubscribe() {
    const isLogin = useRecoilValue(loginState);
    
    if(isLogin) {
        console.log(">>> LOGIN LOGIN LOGIN");
    }

    return (
        <div>ALARM</div>
    )
}