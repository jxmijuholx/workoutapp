import { CalendarViewMonth, Stairs } from '@mui/icons-material';
import FunctionsIcon from '@mui/icons-material/Functions';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';

export default function TabMenu({ value, onChange }) {

  return (
    <Tabs value={value} onChange={onChange} aria-label="app tabs">
      <Tab icon={<FitnessCenterIcon />} label="Workouts" />
      <Tab icon={<PeopleAltIcon />} label="Customers" />
      <Tab icon={<CalendarViewMonth />} label="Calendar" />
      <Tab icon={<Stairs />} label="Statistics" />
      <Tab icon={<FunctionsIcon />} label="Analytics" />
    </Tabs>
  );

}
