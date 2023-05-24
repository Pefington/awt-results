import { useEffect } from "react";
import useSWR from "swr";

import JudgeCard from "@/components/judge/judgeCard";
import { useLayout } from "@/components/layout/layoutContext";
import FetchError from "@/components/ui/fetchError";
import FetchLoading from "@/components/ui/fetchLoading";
import { API_URL } from "@/constants";
import { components } from "@/types";
import { fetcher } from "@/utils/fetcher";

type Judge = components["schemas"]["Judge"];

const Judges = () => {
  const {
    setPageTitle,
    setPageDescription,
    setHeaderTitle,
    setHeaderSubtitle,
    setActiveNav,
  } = useLayout();

  useEffect(() => {
    setPageTitle("Acro World Tour | Judges");
    setPageDescription("All the judges of the Acro World Tour");

    setHeaderTitle("Judges");
    setHeaderSubtitle("Acro World Tour");
    setActiveNav("judges");
  }, [
    setActiveNav,
    setHeaderSubtitle,
    setHeaderTitle,
    setPageDescription,
    setPageTitle,
  ]);

  const { data: judges, error } = useSWR<Judge[], Error>(
    `${API_URL}/judges`,
    fetcher
  );

  if (error) return <FetchError />;
  if (!judges) return <FetchLoading />;

  return (
    <>
      <h2>All Judges</h2>
      <section className="mt-8 px-2">
        <div className="wrapper">
          {judges.map((judge) => (
            <JudgeCard key={judge._id} judge={judge} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Judges;
