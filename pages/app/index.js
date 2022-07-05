import Style from "styles/app/index.module.scss";
import ModFind from "components/app/form";
import { useState, useEffect, useContext } from "react";
import ModList from "components/app/list";
import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
const FIND_COURS = gql`
  query Query($uid: ID!, $find: String) {
    findCours(uid: $uid, find: $find) {
      mod
      ban
      sub
      progress
    }
  }
`;
export default function App() {
  const cookie = useContext(MyCookie);
  const [findme, { data }] = useLazyQuery(FIND_COURS);
  const [find, setFind] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  let timout;
  const typingHandler = e => {
    clearTimeout(timout);
    const { value } = e.target;
    setLoading(value !== "");
    setFind(value);
  };
  const findByValue = () => {
    timout = setTimeout(() => {
      findme({ variables: { uid: cookie.uid, find } });
    }, 500);
  };
  useEffect(() => {
    if (cookie)
      if (find) findByValue();
      else findme({ variables: { uid: cookie.uid, find } });
  }, [find, cookie]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setResult(data.findCours);
    }
  }, [data]);

  return (
    <main className={Style.main}>
      <p className="ar" dir="rtl">
        مرحبا بك !
      </p>
      <section>
        <ModFind props={{ loading, find, typingHandler }} timout={timout} />
        <ModList props={{ loading, result, find }} />
      </section>
    </main>
  );
}
