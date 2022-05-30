import React, { useCallback, useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryTheme,
} from "victory";
import { getEventStudentsCount, IEventStudentsCount } from "../api/event";

const DiagramEvent = () => {
  const [event, setEvent] = useState<IEventStudentsCount[]>([]);

  const fetchEvent = useCallback(async () => {
    try {
      const res = await getEventStudentsCount();
      setEvent(res);
    } catch {}
  }, []);
  useEffect(() => {
    void fetchEvent();
  }, [fetchEvent]);

  return (
    <div>
      <div>За этот учебный год..</div>
      {!!event?.length && (
        <div className="Teams-Chart">
          <VictoryChart
            padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
            domainPadding={{ x: 20 }}
            theme={VictoryTheme.material}
           
          >
            <VictoryBar
              style={{
                data: { fill: "#7B68EE", stroke: "black", strokeWidth: 1 },
              }}
              data={event.map((x) => ({ name: x.name, count: x.studentCount }))}
              x="name"
              y="count"
              labelComponent={<VictoryLabel angle={-45} labelPlacement="vertical" direction=" "/>}
           />
            
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default DiagramEvent;
