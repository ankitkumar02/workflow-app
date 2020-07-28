// tslint:disable
import * as constants from '../constants/action-types';
import { mockdata } from '../components/pages/WorkflowDashboadPage/mockdata';

export const fetchWorkflowsList = () => {
  return { type: constants.FETCH_WORKFLOWS_LIST, payload: mockdata };
};

export const updateWorkflowsList = workflowsList => {
  return { type: constants.FETCH_WORKFLOWS_LIST, payload: workflowsList };
};
