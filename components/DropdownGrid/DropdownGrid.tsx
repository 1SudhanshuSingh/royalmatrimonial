import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./Dropdown.module.scss";

interface Data {
  val: string;
  id: string;
}
interface DropdownGridProps {
  title: string;
  data: {};
  nameid: string;
  selectedDataFn: (val: Data) => void;
}
const DropdownGridSingleSelect: React.FC<DropdownGridProps> = ({
  title,
  data,
  nameid,
  selectedDataFn,
}) => {
  const combinedData = Object.entries(data).map(
    ([key, value]) => `${key}-${value}`
  );
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<string[]>(combinedData);
  const [selectedData, setSelectedData] = useState<Data>({ id: "", val: "" });
  
  const ref = useRef<any>();

  const searchDataFunc = (query: any) => {
    const searched = Object.keys(data).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedData(searched);
  };

  const getClickedData = (data: Data) => {
    setSelectedData(data);
    selectedDataFn(data);
    ref.current.value = "";
  };
  
  return (
    <div className={classes.singleBox}>
      <Form.Label>{title}</Form.Label>
      <div
        className={classes.inputBox}
        onClick={() => setActiveList(!activeList)}
      >
        <li className={classes.blankInput}>
          <Form.Control
            type="text"
            name={nameid}
            placeholder={selectedData.val.split("-")[0] || "Select Some Options"}
            ref={ref}
            onChange={e => searchDataFunc(e.target.value)}
          />
        </li>
        <div
          className={`${activeList ? classes.active : ""} ${
            classes.inputBoxVal
          }`}
        >
          <ul>
            {searchedData.map((item) => {
              const [name, id] = item.split("-");
              return (
                <li
                  key={id}
                  onClick={() =>
                    getClickedData({
                      val: item,
                      id,
                    })
                  }
                  className={selectedData.val === item ? classes.tabActive : ""}
                >
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownGridSingleSelect;