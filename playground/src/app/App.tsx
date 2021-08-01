import "../styles/App.less";
import {
  AsurRaaTableProvider,
  AsurRaaTable,
  AsurRaaColumnsProps,
} from "@asurraa/sura-ui-table";
function App() {
  interface dataInterface {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns: AsurRaaColumnsProps<dataInterface>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "100px",
    },
    {
      title: "Age",
      dataIndex: "name",
      key: "age",
      width: "100px",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "",
      width: "100px",
    },
  ];

  return (
    <div className="App" style={{ padding: 30 }}>
      <AsurRaaTableProvider formateDate={"DD-MM-YYYY"}>
        <AsurRaaTable
          data={dataSource}
          asurRaaColumnProps={columns}
          createButton={{}}
          refreshButton={{
            onClick: () => console.log("refreshButton clicked"),
          }}
        />
      </AsurRaaTableProvider>
    </div>
  );
}

export default App;
