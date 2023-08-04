import { useState, useRef, useEffect, RefObject } from "react";
import { MemberType } from "@/types";
import * as api from "@/api";

export function useSearchMember({
  searchText,
  projectId,
}: {
  projectId: string;
  searchText: string;
}): MemberType[] {
  const [memberList, setMemberList] = useState<MemberType[]>([]);
  const [filteredMemberList, setFilteredMemberList] = useState<MemberType[]>(
    [],
  );
  useEffect(() => {
    if (projectId) {
      api.getProjectMembers(projectId as string).then(response => {
        setMemberList(response.result.memberList);
      });
    }
  }, [projectId]);

  useEffect(() => {
    const filteredMemberList = memberList.filter(member =>
      member.name.includes(searchText),
    );
    setFilteredMemberList([...filteredMemberList]);
  }, [searchText]);

  return filteredMemberList;
}
