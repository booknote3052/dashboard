import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Maps from "views/Maps/Maps";
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [allcase, setAllcase] = React.useState();
  const [arrquessum, setArrquesum] = React.useState([]);
  const [arrquesname, setArrquesname] = React.useState([]);
  const [caseclose, setCaseclose] = React.useState();
  const [casenotclose, setCasenotclose] = React.useState();
  const [casetoday, setCasetoday] = React.useState();
  const [arrcaseday, setArr] = React.useState([]);
  const [arrlabelsday, setArr1] = React.useState([]);
  const [arrclosecase, setArrclosecase] = React.useState([]);
  const [arrlabelclosecase, setArrlabesclosecase] = React.useState([]);
  const [table, setTable] = React.useState([]);

  let sumallcase = 0;
  let sumcaseclose = 0;
  let sumcasenotclose = 0;

  React.useEffect(() => {
    async function getJSON() {
      const response = await fetch("http://localhost:3333/getallcase", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();

      setAllcase(sum[0].sum);
    }

    async function getJSON1() {
      const response = await fetch("http://localhost:3333/getcaseclose", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();

      setCaseclose(sum[0].sum);
    }

    async function getJSON2() {
      const response = await fetch("http://localhost:3333/getcasenotclose", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();

      setCasenotclose(sum[0].sum);
    }
    async function getJSON3() {
      const response = await fetch("http://localhost:3333/gettodaycase", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();

      setCasetoday(sum[0].sum);
    }
    async function getJSON4() {
      var array = [];
      var array1 = [];
      
      const response = await fetch("http://localhost:3333/getallcaseinpast", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();
      for (let i = sum.length - 7; i < sum.length; i++) {
        array.push(sum[i].sum);
      }
      for (let i = sum.length - 7; i < sum.length; i++) {
        array1.push(sum[i].date);
      }
      setArr(array);
      setArr1(array1);
    }
    async function getJSON5() {
      var array =[];
      var array1 =[];
      
      const response = await fetch("http://localhost:3333/getquestionlevel2", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();
      for(let i =0;i<sum.length;i++)
      {
        array.push(sum[i].sum);
      }
      for(let i =0;i<sum.length;i++)
      {
        array1.push(sum[i].name);
      }
      setArrquesum(array);
      setArrquesname(array1);
      
    
    }
    async function getJSON6() {
      var array =[];
      var array1 =[];
      
      const response = await fetch("http://localhost:3333/getclosecaseinpast", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();
      for(let i =0;i<sum.length;i++)
      {
        array.push(sum[i].sum);
      }
      for(let i =0;i<sum.length;i++)
      {
        array1.push(sum[i].date);
      }
      setArrclosecase(array);
      setArrlabesclosecase(array1);
      
    
    }
    async function getJSON7() {
      
     
      var array1 =[];
      const response = await fetch("http://localhost:3333/gettableallcase", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();
      for(let i =0;i<sum.length;i++)
      { var array =[];
        array.push(sum[i].Province,sum[i].allcase,sum[i].casedone,sum[i].casenull,sum[i].percent+'%');
        array1.push(array);
      }
       setTable(array1);
      
    
    }

    getJSON();
    getJSON1();
    getJSON2();
    getJSON3();
    getJSON4();
    getJSON5();
    getJSON6();
    getJSON7();
  }, []);


  const classes = useStyles();
  sumallcase = allcase;
  sumcaseclose = caseclose;
  sumcasenotclose = casenotclose;

  let ansclose = (sumcaseclose / sumallcase) * 100;
  let ansnotcloase = (sumcasenotclose / sumallcase) * 100;
  let anstoday = (casetoday / sumallcase) * 100;
  let ansall = ((sumcaseclose + sumcasenotclose) / sumallcase) * 100;
  let percenttoday = anstoday.toString();
  let percentclose = ansclose.toString();
  let percentnotclose = ansnotcloase.toString();
  let percentall = ansall.toString();
  const pclose = percentclose.substring(0, 5);
  const pnotclose = percentnotclose.substring(0, 5);
  const ptoday = percenttoday.substring(0, 5);
  const pall = percentall.substring(0, 5);
  dailySalesChart.data.labels = arrlabelsday;
  dailySalesChart.data.series = [arrcaseday];
  emailsSubscriptionChart.data.labels=arrquesname;
  emailsSubscriptionChart.data.series =[arrquessum];
  completedTasksChart.data.labels=arrlabelclosecase;
  completedTasksChart.data.series=[arrclosecase];
 
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <p className={classes.cardCategory}>คำถามทั้งหมด</p>
              <h3 className={classes.cardTitle}>{allcase}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>{pall}%คำถามทั้งหมด</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <p className={classes.cardCategory}>
                จำนวนเรื่องที่สามารถปิดเรื่องได้
              </p>
              <h3 className={classes.cardTitle}>{caseclose}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>{pclose}%ที่ปิดแล้ว</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <p className={classes.cardCategory}>
                จำนวนเรื่องติดต่อที่ไม่สามารถปิดได้
              </p>
              <h3 className={classes.cardTitle}>{casenotclose}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>{pnotclose}%ที่ปิดไม่ได้</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <p className={classes.cardCategory}>จำนวนเรื่องของวันนี้</p>
              <h3 className={classes.cardTitle}>+{casetoday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>{ptoday}%เรื่องของวันนี้</div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>จำนวนเรื่องแต่ละวัน</h4>
             
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>สัดส่วนประเด็นเรื่องติดต่อ</h4>
              
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>งานที่ปิดได้ในแต่ละวัน</h4>
              
            </CardBody>
           
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
        <Maps xs={12} sm={12} md={6}/ >
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                สถานะเรื่องติดต่อจำแนกรายพื้นที่
              </h4>
              
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "พื้นที่",
                  "เรื่องที่ติดต่อทั้งหมด",
                  "เรื่องที่ติดต่อปิดได้",
                  "เรื่องติดต่อที่ปิดไม่ได้",
                  "%ที่ปิดแล้ว",
                ]}
                tableData={table}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
