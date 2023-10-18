import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ForcedReload from "@/components/ForceReload";

export default function CoursesPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshFlag = localStorage.getItem("pageRefreshed");
    if (token && !refreshFlag) {
      localStorage.setItem("pageRefreshed", "true");
      router.refresh();
    }
  }, []);

  return (
    <div>
      {/* <ForcedReload /> */}
      <div>Courses route</div>
    </div>
  );
}
