import { State, IState, Country, ICountry } from "country-state-city";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CountryStateCityMultiple.module.scss";
import { IoClose } from "react-icons/io5";

interface StateProps {
  defaultValueCountry?: number;
  defaultValueState?: number;
  setSelectedState: (id: number) => void;
}

const StateSingle: React.FC<StateProps> = ({
  defaultValueCountry,
  setSelectedState,
  defaultValueState,
}) => {
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>( defaultValueCountry ? countries[defaultValueCountry].isoCode : "IN");

  
  useEffect(() => {
    if (defaultValueCountry != undefined) {
      setTimeout(() => {
        setCountryCode(countries[defaultValueCountry].isoCode);
        UpdatesearchHostedArray(State.getStatesOfCountry(countryCode));
      }, 100);
    }
  }, [countryCode]);

  const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
  let Defaultstate =
    defaultValueState && stateOfCountry[defaultValueState].name;
  const elementRef = useRef<HTMLDivElement>(null);
  const [activeList, setActiveList] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");
  const [selecedData, setSelecedData] = useState(
    Defaultstate || "Select State"
  );
  const [searchHostedArray, UpdatesearchHostedArray] = useState<IState[]>(
    State.getStatesOfCountry(countryCode)
  );

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = stateOfCountry.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected

  const getClickedData = (item: IState) => {
    setSelecedData(item.name);
    const getIndex = stateOfCountry.findIndex((obj) => obj.name === item.name);
    console.log(item,stateOfCountry,getIndex,"get clicked data");
    setSelectedState(getIndex);
    setTimeout(() => {
      setActiveList(false);
    }, 100);
  };

  // To Find the country Which is get defaultValueState
  useEffect(() => {
    if (defaultValueCountry != undefined) {
      setCountryCode(
        countries[defaultValueCountry ? defaultValueCountry : 0].isoCode
      );
    }
  }, [defaultValueCountry]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef?.current?.contains(event.target)) {
        setActiveList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef]);

  return (
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>State</label>
        <div className={classes.inputBox} onClick={() => setActiveList(true)}>
          <ul>
            {activeList ? (
              <input
                type="text"
                value={searchInput}
                onChange={(e) => searchDataFunc(e.target.value)}
              />
            ) : (
              <p>{selecedData}</p>
            )}
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${
              classes.inputBoxVal
            }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 1 ? (
                searchHostedArray?.map((item, index) => {
                  return (
                    <li
                      key={item.isoCode}
                      onClick={() => {
                        setActiveList(false);
                        getClickedData(item);
                      }}
                    >
                      <span>{item?.name}</span>
                    </li>
                  );
                })
              ) : (
                <span>No Data Found</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateSingle;