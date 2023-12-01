import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import TabMenu from './components/TabMenu';
import WorkoutsList from './components/WorkoutsList';
import WorkoutCalendar from './components/WorkoutCalendar';
import StatisticsPage from './components/StatisticsPage';
import WorkoutAnalytics from './components/WorkoutAnalytics';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <TabMenu value={selectedTab} onChange={handleTabChange} />
      {selectedTab === 1 && <CustomerList />}
      {selectedTab === 0 && <WorkoutsList />}
      {selectedTab === 2 && <WorkoutCalendar />}
      {selectedTab === 3 && <StatisticsPage />}
      {selectedTab === 4 && <WorkoutAnalytics />}
    </div>
  );
}

export default App;
