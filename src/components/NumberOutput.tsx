import { FunctionComponent, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";

interface NumberOutputProps {
    count: number[]
    onClick: (limit: number) => void
    method: string
}

const NumberOutput: FunctionComponent<NumberOutputProps> = ({count, onClick, method}) => {
    const [limit, setLimit] = useState('1')
  return (
    <Card style={{width: '25%', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
        <Card.Body style={{alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Card.Title style={{height: '40%'}}>{method}</Card.Title>
        <Card.Text>
          {count.join(' ')}
        </Card.Text>
        <Form.Control type="string" onChange={(e) => setLimit(e.target.value)} value={limit} style={{width: "50%", marginBottom: '16px'}}/>
        <Button variant={"primary"} onClick={() => onClick(eval(limit))}>Найти числа</Button>
      </Card.Body>
    </Card>
  );
};

export default NumberOutput;
