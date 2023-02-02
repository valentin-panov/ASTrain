import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import DashboardMetric from "../../components/DashboardMetric";
import Card from "../../components/common/card/Card";
import { FetchContext } from "../../context/FetchContext";
import { formatCurrency } from "../../util";
import DashboardChart, { ISalesData } from "../../components/DashboardChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MainLayout } from "../../layouts";

interface IDashboardData {
  salesVolume: string;
  refunds: string;
  newCustomers: string;
  graphData: ISalesData[];
}

const Dashboard: React.FC = () => {
  const fetchContext = useContext(FetchContext);
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(
    null
  );

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const { data } = await fetchContext.authAxios.get("dashboard-data");
        setDashboardData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, [fetchContext]);

  return (
    <MainLayout>
      <PageTitle title="Dashboard" />
      {dashboardData ? (
        <>
          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Sales Volume"
                value={formatCurrency(dashboardData.salesVolume)}
                icon={<BarChartIcon />}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="New Customers"
                value={dashboardData.newCustomers}
                icon={<PersonAddAltIcon />}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Refunds"
                value={formatCurrency(dashboardData.refunds)}
                icon={<AttachMoneyIcon />}
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <Card>
              {dashboardData && (
                <DashboardChart salesData={dashboardData.graphData} />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </MainLayout>
  );
};

export default Dashboard;
