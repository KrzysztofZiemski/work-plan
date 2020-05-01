import React, { useContext } from 'react';
import { WorkPlanContext } from '../GraphicPage';
import Line from '../Line/Line';

const Shift = ({ shift }) => {
            const { workPlan } = useContext(WorkPlanContext);

            return (
                        <div>
                                    {workPlan.workShifts[shift].lines.map((line, index) => <Line key={`line${index}`} shift={shift} line={index}></Line>)}
                        </div>
            )
}

export default Shift;