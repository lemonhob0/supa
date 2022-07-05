import { useRouter } from "next/router";
import { ModIcon } from "components/svg/ui";
import Progress from "components/layout/progress";
import Style from "styles/mod/progress.module.scss";
export default function ModProgress({ modP }) {
  const router = useRouter();
  const { mod } = router.query;

  return (
    <article className={Style.progress}>
      <ModIcon ban={modP.ban} />
      <h1 className="en">{mod}</h1>
      <Progress
        color={modP.progress === 100 ? "orange" : null}
        height={"2em"}
        progress={modP.progress}
      />
    </article>
  );
}
