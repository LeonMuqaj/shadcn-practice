import AppAreaChart from "./components/AppAreaChart";
import AppBarChart from "./components/AppBarChart";
import AppPieChart from "./components/AppPieChart";
import CardList from "./components/CardList";
import TodoList from "./components/TodoList";
import { useTranslations } from "next-intl";

const Homepage = () => {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title={t("dashboard.latestTransactions")} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 xl:col-span-2">
        <AppAreaChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title={t("dashboard.popularContent")} />
      </div>
    </div>
  );
};

export default Homepage;
