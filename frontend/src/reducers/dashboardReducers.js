
import {
  DASHBOARD_SUMMARY_REQUEST,
  DASHBOARD_SUMMARY_SUCCESS,
  DASHBOARD_SUMMARY_FAIL,
} from '../constants/dashboardConstants';

export const dashboardSummaryReducer = (state = { summary: {} }, action) => {
  switch (action.type) {
    case DASHBOARD_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case DASHBOARD_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case DASHBOARD_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
