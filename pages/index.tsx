import type { NextPage } from "next";
import Table from "../components/layout/Table";
import styles from "../styles/Home.module.css";
import Card from "../components/layout/Card";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-3 gap-4 my-3">



      <Card title="Created" actionButtonLabel={"Created"} secondaryButtonLabel={"Hello World"}>
        <Table/>
      </Card>


      <Card  title="On Progress" actionButtonLabel={"On Progress"} secondaryButtonLabel={"Hello World"}>
        <Table/>
      </Card>

      <Card  title="Done" actionButtonLabel={"Done"} secondaryButtonLabel={"Hello World"}>
        <Table/>
      </Card>
      </div>
   </div>
  );
};

export default Home;
