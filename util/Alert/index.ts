import Swal, { SweetAlertResult } from "sweetalert2";
import { NextRouter } from "next/router";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export class Alert {
  static basicMessage(title: string) {
    Swal.fire(title);
  }

  static error(title: string, link?: string, router?: NextRouter) {
    Swal.fire({
      icon: "error",
      title: title,
      confirmButtonText: "확인",
      confirmButtonColor: "#81A0D3",
    }).then(result => {
      if (result.isConfirmed && link && router) {
        router.push(link);
      }
    });
  }

  static success(title: string, link?: string, router?: NextRouter) {
    Swal.fire({
      icon: "success",
      title: title,
      confirmButtonText: "확인",
      confirmButtonColor: "#81A0D3",
    }).then(result => {
      if (result.isConfirmed && link && router) {
        router.push(link);
      }
    });
  }

  static warn(title: string, text: string) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
    });
  }

  static async question(title: string): Promise<SweetAlertResult> {
    const result = await Swal.fire({
      icon: "question",
      title: title,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      showCancelButton: true,
      confirmButtonColor: "#81A0D3",
      cancelButtonColor: "#CB4647",
    });
    return result;
  }

  static releaseQuestion(
    title: string,
    projectId: string,
    setReleaseType: Dispatch<SetStateAction<string>>,
    setCancel: Dispatch<SetStateAction<boolean>>,
    router: NextRouter,
  ) {
    Swal.fire({
      icon: "question",
      title: title,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      showCancelButton: true,
      confirmButtonColor: "#81A0D3",
      cancelButtonColor: "#CB4647",
    }).then(result => {
      if (result.isConfirmed) {
        setReleaseType("");
        setCancel(false);
        router.push(`/Releases/${projectId}`);
      } else {
        setCancel(false);
      }
    });
  }

  static confirmDelete(
    title: string,
    text: string,
    axiosURL: string,
    subTitle: string,
    subText: string,
    delFunc: Function,
    funcParam: number,
    failTitle: string,
  ) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D9D9D9",
      cancelButtonColor: "#CB4647",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      focusCancel: true,
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .post(axiosURL)
          .then(response => {
            if (response.data.isSuccess) {
              Swal.fire(subTitle, subText, "success");
              delFunc(funcParam);
            } else {
              Swal.fire(failTitle, response.data.message, "error");
            }
          })
          .catch(error => {
            Swal.fire(
              failTitle,
              "서버와의 통신 중 오류가 발생했습니다.",
              "error",
            );
          });
      }
    });
  }
}
