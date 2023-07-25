import { useRouter } from "next/router";
import { useEffect } from "react";
import { useEdges } from "reactflow";
import * as api from "@/api";
import { response } from "msw";
import { Alert } from "@/util/Alert";
import { getAccessToken } from "@/storage/Cookie";

export default function InviteMember() {
  const router = useRouter();
  const inviteLink = router.query.id;

  useEffect(() => {
    if (inviteLink && getAccessToken()) {
      api.postAddProjectMember(inviteLink as string).then(response => {
        if (response.isSuccess) {
          Alert.success("프로젝트에 참여되었습니다.");
          sessionStorage.removeItem("prevRoute");
          router.push("/ProjectWorkspace");
        } else {
          Alert.errorWithResponse(response.message).then(response => {
            if (response.isConfirmed) {
              router.push("/ProjectWorkspace");
            }
          });
        }
      });
    } else {
      Alert.error("로그인 진행해주세요");
      router.push("/Login");
      //   Alert.errorWithResponse("로그인을 진행해주세요").then(response => {
      //     if (response.isConfirmed) {
      //       sessionStorage.setItem(
      //         "prevRoute",
      //         `http://localhost:3000/InviteMember/${inviteLink}`,
      //       );
      //       router.push("/Login");
      //     }
      //   });
    }
  }, [inviteLink]);

  return null;
}

// b3e162f7-bf8c-49f4-9097-2f1432d29bcc
