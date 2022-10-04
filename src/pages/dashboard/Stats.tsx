import StatsContainer from "../../components/StatsContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import ChartsContainer from "../../components/ChartsContainer";
import { showStats } from "../../features/AllJobs/allJobsSlice";

function Stats() {
	const { monthlyApplications } = useSelector((store: RootState) => store.allJobs
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(showStats(undefined));
	}, []);
	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	);
}
export default Stats;
