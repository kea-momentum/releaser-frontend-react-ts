import { ReleaseReport } from "@/types";
import Tag from "../\bTag";

export default function ReportEditForm({
  releaseReport,
}: {
  releaseReport: ReleaseReport;
}) {
  return (
    <>
      <div>{releaseReport.releaseVersion}</div>
      <div>{releaseReport.releaseContent}</div>
      {releaseReport.tagsList?.map(tag => (
        <Tag tagText={tag.tag} />
      ))}
    </>
  );
}
