// import PCopy from "@components/PCopy";
import "./index.scss";

interface PJsonProps {
  data: object;
}

const PJson: React.FC<PJsonProps> = ({ data: jsonData }) => {
  return (
    <div className="pJson">
      {/* <PCopy text={JSON.stringify(jsonData, null, 2)} /> */}
      <pre>
        <code className="json">{JSON.stringify(jsonData, null, 2)}</code>
      </pre>
    </div>
  );
};

export default PJson;
