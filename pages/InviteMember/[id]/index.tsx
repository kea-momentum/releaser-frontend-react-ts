import { useRouter } from "next/router";
import { useEffect } from "react";
import * as api from "@/api";
import { Alert } from "@/util";
import { getAccessToken } from "@/storage/Cookie";

export default function InviteMember() {
  // const router = useRouter();
  // const inviteLink = router.query.id;
  // const token = window.sessionStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (inviteLink && token) {
  //     api.postAddProjectMember(inviteLink as string).then(response => {
  //       if (response.isSuccess) {
  //         Alert.success("프로젝트에 참여되었습니다.");
  //         sessionStorage.removeItem("prevRoute");
  //         router.push("/ProjectWorkspace");
  //       } else {
  //         Alert.errorWithResponse(response.message).then(response => {
  //           if (response.isConfirmed) {
  //             router.push("/ProjectWorkspace");
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     Alert.error("로그인을 진행해주세요");
  //     router.push("/Login");
  //   }
  // }, [inviteLink]);

  return <div></div>;
}
