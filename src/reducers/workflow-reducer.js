import * as constants from '../constants/action-types';
import { mockdata } from '../components/pages/WorkflowDashboadPage/mockdata';

const initialState = {
  workflowsList: mockdata
};

const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_WORKFLOWS_LIST:
      return {
        ...state,
        workflowsList: action.payload
      };

    case constants.UPDATE_WORKFLOWS_LIST:
      return {
        ...state,
        workflowsList: action.payload
      };

    default:
      return state;
  }
};

export default workflowReducer;
