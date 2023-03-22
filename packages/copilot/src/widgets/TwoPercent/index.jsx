import { Row, Col, InputNumber } from 'antd';
import '../../styles/index.less';

const TwoPercent = props => {
  const { labelList = [], value = [], onChange, addonAfter = '%' } = props;

  const changeFirst = val => {
    onChange([val, 100 - val]);
  };
  const changeLast = val => {
    onChange([100 - val, val]);
  };

  return (
    <Row gutter={20}>
      <Col span={12} className="align-center">
        <span style={{ display: 'inline-block', paddingTop: '5px' }}>{labelList[0]}：</span>
        <InputNumber
          value={value[0]}
          onChange={changeFirst}
          min={0}
          max={100}
          addonAfter={addonAfter}
        />
      </Col>
      <Col span={12} className="align-center">
        <span style={{ display: 'inline-block', paddingTop: '5px' }}>{labelList[1]}：</span>
        <InputNumber
          value={value[1]}
          onChange={changeLast}
          min={0}
          max={100}
          addonAfter={addonAfter}
        />
      </Col>
    </Row>
  );
};

export default TwoPercent;
