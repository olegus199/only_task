import "./App.scss";
import HistoricalDatesSection from "../features/historical-dates/HistoricalDatesSection.tsx";
import HistoricalDatesProvider from "../features/historical-dates/HistoricalDatesProvider.tsx";

function App() {

  return (
    <>
      <HistoricalDatesProvider>
        <HistoricalDatesSection />
      </HistoricalDatesProvider>
    </>
  );
}

export default App;