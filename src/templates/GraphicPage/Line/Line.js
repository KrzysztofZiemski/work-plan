import React, { useContext } from 'react';
import WorkPlace from '../WorkPlace/WorkPlace';
import { WorkPlanContext } from '../GraphicPage';

const Line = ({ shift, line }) => {
            const { workPlan } = useContext(WorkPlanContext);
            return (
                        <div>
                                    {workPlan.workShifts[shift].lines[line].workplaces.map((workplace, index) => <WorkPlace key={`workplace${index}`} shift={shift} line={line} workPlace={index}></WorkPlace>)}
                        </div>
            )
}

export default Line;