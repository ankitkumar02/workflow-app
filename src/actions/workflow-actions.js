// tslint:disable
import * as constants from '../constants/action-types';
import { mockdata } from '../components/pages/WorkflowDashboadPage/mockdata';

export const fetchWorkflowsList = () => {
  debugger;
  console.log('fetchWorkflowsList action called', mockdata);
  return { type: constants.FETCH_WORKFLOWS_LIST, payload: mockdata };
};

export const updateWorkflowsList = workflowsList => {
  debugger;
  console.log('updateWorkflowsList action called', workflowsList);
  return { type: constants.FETCH_WORKFLOWS_LIST, payload: workflowsList };
};
