import React, { useEffect, useState } from 'react';
import Card from 'Components/Common/Card';
import FilterMenu from 'Components/Dashboard/FilterMenu';
import { customAxios } from 'API';
import { DataInterface } from 'Utils/Interface';

import 'Components/Dashboard/scss/Dashboard.scss';

const Dashboard: React.FC = () => {
  let count = 0;

  const [toggle, setToggle] = useState<boolean>(false);
  const [datas, setDatas] = useState<DataInterface[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);

  useEffect(() => {
    const requestGET = async (): Promise<void> => {
      await customAxios.get('/').then((res) => {
        setDatas(res.data);
      });
    };
    requestGET();
    count = datas.length;
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleReset = () => {
    setSelectedMethod([]);
    setSelectedMaterial([]);
    if (toggle) setToggle(false);
  };

  useEffect(() => {
    count = 0;
  }, [toggle, selectedMethod, selectedMaterial]);

  return (
    <div className="body-container">
      <div className="body-container__header">
        <h1 className="body-container__header__title">들어온 요청</h1>
        <h3 className="body-container__header__subtitle">
          파트너님에게 딱 맞는 요청서를 찾아보세요.
        </h3>
      </div>
      <FilterMenu
        toggle={toggle}
        handleReset={handleReset}
        handleToggle={handleToggle}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
      />
      <div className="dash-board">
        {datas.map((data: DataInterface) => {
          if (toggle && data.status !== '상담중') return null;
          else if (
            selectedMethod.length > 0 &&
            selectedMethod.filter((element) => data.method.includes(element))
              .length !== selectedMethod.length
          )
            return null;
          else if (
            selectedMaterial.length > 0 &&
            selectedMaterial.filter((element) =>
              data.material.includes(element)
            ).length !== selectedMaterial.length
          )
            return null;
          else {
            count += 1;
            return <Card key={data['id']} data={data} />;
          }
        })}
      </div>
      {count === 0 && (
        <div className="card-zero">조건에 맞는 견적 요청이 없습니다.</div>
      )}
    </div>
  );
};

export default Dashboard;
